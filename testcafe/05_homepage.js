import { RequestMock, Selector } from 'testcafe'

import { API_URL, ROOT_PATH } from '../src/utils/config'
import getPageUrl from './helpers/getPageUrl'
import { matomoLogger, filterUrlWithAction } from './helpers/matomo'
import createUserRoleFromUserSandbox from './helpers/createUserRoleFromUserSandbox'
import { mockAlgoliaResponse, mockContentfulResponse, mockOfferResponse } from './mocks'

let mock = RequestMock()
  .onRequestTo(/cdn.contentful.com/)
  .respond(mockContentfulResponse, 200, { 'Access-Control-Allow-Origin': '*' })
  .onRequestTo(/dsn.algolia.net/)
  .respond(mockAlgoliaResponse, 200, { 'Access-Control-Allow-Origin': '*' })
  .onRequestTo(`${API_URL}offers/${mockOfferResponse.id}`)
  .respond(mockOfferResponse, 200)

fixture('Homepage,')

// eslint-disable-next-line jest/no-done-callback
test('je peux ajouter une offre à mes favoris et la réserver', async t => {
  const userRole = await createUserRoleFromUserSandbox(
    'webapp_08_booking',
    'get_existing_webapp_user_can_book_event_offer'
  )

  const module = Selector('h1').withExactText('Pour bien commencer...').parent('section')
  const offer = module.find('div.otw-offer-name').withExactText('Dormons peu soupons bien')

  const favButton = Selector('button.fav-button')
  const favButtonIcon = favButton.child('img')

  await t
    .addRequestHooks([mock, matomoLogger])
    .useRole(userRole)
    .navigateTo(`${ROOT_PATH}`)
    .expect(module.exists)
    .ok()

  // 1. Quand on clique sur une offre, l'événement ConsultOffer est lancé avec le nom du module
  await t.expect(filterUrlWithAction(matomoLogger, 'ConsultOffer').length === 0).ok()
  await t.hover(offer).click(offer).wait(1000)

  const consultOfferUrls = filterUrlWithAction(matomoLogger, 'ConsultOffer')
  await t.expect(consultOfferUrls.length === 1).ok()
  await t.expect(consultOfferUrls[0].searchParams.get('e_n') === 'Pour bien commencer...').ok()

  // 2. On est sur la page 'détail de l'offre' avec une offre déjà en favoris
  await t
    .expect(getPageUrl())
    .eql(`${ROOT_PATH}accueil/details/${mockOfferResponse.id}`)
    .expect(favButtonIcon.getAttribute('alt'))
    .eql('Retirer des favoris')
    .click(favButton) // retirer des favoris

  // 3. Quand on met l'offre en favoris, l'évènement matomo InFavorite est lancé avec le nom du module de la home
  await t.expect(filterUrlWithAction(matomoLogger, 'InFavorite').length === 0).ok()
  await t.click(favButton).wait(1000)

  const inFavoriteUrls = filterUrlWithAction(matomoLogger, 'InFavorite')
  await t.expect(inFavoriteUrls.length === 1).ok()
  await t.expect(inFavoriteUrls[0].searchParams.get('e_n') === 'Pour bien commencer...').ok()
})

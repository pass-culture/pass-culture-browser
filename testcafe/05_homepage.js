import { RequestMock, Selector } from 'testcafe'

import { ROOT_PATH } from '../src/utils/config'
import getPageUrl from './helpers/getPageUrl'
import { matomoLogger, filterUrlWithAction } from './helpers/matomo'
import createUserRoleFromUserSandbox from './helpers/createUserRoleFromUserSandbox'
import {
  mockAlgoliaResponse,
  mockContentfulResponse,
  mockFavorites,
  mockOfferResponse,
} from './mocks'

let mock = RequestMock()
  .onRequestTo(/cdn.contentful.com/)
  .respond(mockContentfulResponse, 200, { 'Access-Control-Allow-Origin': '*' })
  .onRequestTo(/dsn.algolia.net/)
  .respond(mockAlgoliaResponse, 200, { 'Access-Control-Allow-Origin': '*' })
  .onRequestTo(request => request.url.includes('/favorites') && request.method === 'get')
  .respond(mockFavorites, 200, { 'Access-Control-Allow-Origin': '*' })
  .onRequestTo(request => request.url.includes('/offers/EM') && request.method === 'get')
  .respond(mockOfferResponse, 200, { 'Access-Control-Allow-Origin': '*' })

fixture('Homepage,').requestHooks(matomoLogger)

// eslint-disable-next-line jest/no-done-callback
test.requestHooks(mock)('je peux ajouter une offre à mes favoris et la réserver', async t => {
  const userRole = await createUserRoleFromUserSandbox(
    'webapp_08_booking',
    'get_existing_webapp_user_can_book_event_offer'
  )

  const module = Selector('h1').withExactText('Pour bien commencer...').parent('section')
  const offer = module.find('div.otw-offer-name').withExactText('Dormons peu soupons bien')

  const favButton = Selector('button.fav-button')
  const favOffer = Selector('div.teaser-title').nth(0)

  await t.useRole(userRole).navigateTo(`${ROOT_PATH}`).expect(module.exists).ok()

  // 1. Quand on clique sur une offre, l'événement ConsultOffer est lancé avec le nom du module
  await t.expect(filterUrlWithAction(matomoLogger, 'ConsultOffer').length === 0).ok()
  await t.hover(offer).click(offer).wait(1000)

  const consultOfferUrls = filterUrlWithAction(matomoLogger, 'ConsultOffer')
  await t.expect(consultOfferUrls.length === 1).ok()
  await t.expect(consultOfferUrls[0].searchParams.get('e_n') === 'Pour bien commencer...').ok()

  // 2. On est sur la page 'détail de l'offre
  await t.expect(getPageUrl()).eql(`${ROOT_PATH}accueil/details/${mockOfferResponse.id}`)
  await t.expect(filterUrlWithAction(matomoLogger, 'InFavorite').length === 0).ok()
  await t.wait(2000)

  // 3. Quand on met l'offre en favoris, l'évènement matomo InFavorite est lancé avec le nom du module de la home
  await t.click(favButton).wait(2000) // toggle
  await t.click(favButton).wait(2000)

  const inFavoriteUrls = filterUrlWithAction(matomoLogger, 'InFavorite')
  await t.expect(inFavoriteUrls.length === 1).ok() // 1 seule fois
  await t.expect(inFavoriteUrls[0].searchParams.get('e_n') === 'Pour bien commencer...').ok()

  // 4. Quand on clique sur une offre depuis la page des favoris, l'évènement InFavorite n'est pas lancé
  matomoLogger.clear()
  await t.navigateTo(`${ROOT_PATH}favoris`).click(favOffer).wait(1000).debug()
  await t.expect(getPageUrl()).contains(`${ROOT_PATH}favoris/details/`)

  await t.click(favButton).wait(1000) // retirer des favoris
  await t.click(favButton).wait(1000) // ajouter aux favoris
  await t.expect(filterUrlWithAction(matomoLogger, 'InFavorite').length === 0).ok()
})

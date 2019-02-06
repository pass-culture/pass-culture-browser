// ./node_modules/.bin/testcafe chrome ./testcafe/08_bookings.js
// import { Selector } from 'testcafe'

import getPageUrl from './helpers/getPageUrl'
import { ROOT_PATH } from '../src/utils/config'
import { createUserRole } from './helpers/roles'
import { hasSignedUpUser93 } from './helpers/users'

// const bookingVersoButton = Selector('#open-menu-button')

fixture('08_01 Booking Card').before(async t => {
  await t
    .useRole(createUserRole(hasSignedUpUser93))
    .navigateTo(`${ROOT_PATH}decouverte/KU/LE/verso`)
    .wait(100)
})

test('Je suis redirigé vers la page /decouverte/KU/LE/verso', async t => {
  await t
    .expect(getPageUrl())
    .contains('/decouverte/KU/LE/verso', { timeout: 500 })
})

// J'accède à une offre
// Je clique sur le bouton fleche/details
// Je peux cliquer sur le bouton j'y vais
// J'ouvre la popup de réservation
// Le calendrier ne s'affiche pas, Si il s'agit d'une offre physique
// Le calendrier s'affiche, Si il ne s'agit pas d'une offre physique
// 25-10_18 Une offre a été réservée, je n'y suis pas allé, l'offre n'est plus disponible. Actuellement, elle apparaît encore dans mes réservations.

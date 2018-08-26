/* eslint no-console: 0, max-nested-callbacks: 0 */
import { expect } from 'chai'
import { filterUniqRecommendations } from './filterUniqRecommendations'

describe('filterUniqRecommendations', () => {
  describe('doit filtrer les recommendations par IDs uniques', () => {
    it('priorité aux eventId', () => {
      const value = [
        { offer: { eventId: null, thingId: null } },
        { offer: { eventId: 'AB', returned: true } },
        { offer: { eventId: 'AB', returned: false } },
        { offer: { eventId: 'BC', returned: true } },
      ]
      const expected = [
        { offer: { eventId: null, thingId: null } },
        { offer: { eventId: 'AB', returned: true } },
        { offer: { eventId: 'BC', returned: true } },
      ]
      const result = filterUniqRecommendations(value)
      expect(expected).to.deep.equal(result)
    })
    it('priorité aux thingId', () => {
      const value = [
        { offer: { eventId: null, thingId: null } },
        { offer: { returned: true, thingId: 'AB' } },
        { offer: { returned: false, thingId: 'AB' } },
        { offer: { returned: true, thingId: 'BC' } },
      ]
      const expected = [
        { offer: { eventId: null, thingId: null } },
        { offer: { returned: true, thingId: 'AB' } },
        { offer: { returned: true, thingId: 'BC' } },
      ]
      const result = filterUniqRecommendations(value)
      expect(expected).to.deep.equal(result)
    })
    it('priorité aux tutoIndex', () => {
      const value = [
        { offer: { eventId: null, thingId: null } },
        { mediation: { tutoIndex: 'AB' }, returned: true },
        { mediation: { tutoIndex: 'AB' }, returned: false },
        { mediation: { tutoIndex: 'BC' }, returned: true },
      ]
      const expected = [
        { offer: { eventId: null, thingId: null } },
        { mediation: { tutoIndex: 'AB' }, returned: true },
        { mediation: { tutoIndex: 'BC' }, returned: true },
      ]
      const result = filterUniqRecommendations(value)
      expect(expected).to.deep.equal(result)
    })
    it('si aucun retourne la mediation', () => {
      const value = [{ offer: { eventId: null, thingId: null } }]
      const expected = [{ offer: { eventId: null, thingId: null } }]
      const result = filterUniqRecommendations(value)
      expect(expected).to.deep.equal(result)
    })
  })
})

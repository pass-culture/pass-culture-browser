import { mapStateToProps } from '../BookingItemContainer'

describe('src | components | pages | my-bookings | BookingItemContainer', () => {
  describe('mapStateToProps()', () => {
    it('should return props with date elements', () => {
      // given
      const bookingId = 'AE'
      const token = 'BBBB'
      const offerId = 'CCCC'
      const isCancelled = true
      const mediationId = 'AAAA'
      const departementCode = '93'
      const productName = 'Fake booking name'
      const beginningDatetime = '2019-05-15T20:00:00Z'
      const pathname = '/reservations'
      const search = ''
      const thumbUrl = 'https://example.net/mediation/image'
      const recommendation = {
        id: 'AE',
        mediationId,
        offer: {
          id: offerId,
          isEvent: true,
          product: { name: productName },
          venue: {
            departementCode,
          },
        },
        thumbUrl,
      }
      const state = {
        data: {
          recommendations: [recommendation],
        },
      }
      const ownProps = {
        booking: {
          id: bookingId,
          isCancelled,
          recommendationId: 'AE',
          stock: {
            beginningDatetime,
            resolvedOffer: {
              id: offerId,
            },
          },
          token,
        },
        location: {
          pathname,
          search,
        },
      }

      // when
      const props = mapStateToProps(state, ownProps)

      // then
      const expected = { recommendation }
      expect(props).toStrictEqual(expected)
    })
  })
})

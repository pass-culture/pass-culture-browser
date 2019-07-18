import { stringify, mapStateToProps } from '../BookingItemContainer'

describe('src | components | pages | my-bookings | BookingItemContainer', () => {
  describe('stringify()', () => {
    it('should stringify and capitalize a date with a time zone', () => {
      // given
      const date = '2019-07-08T20:00:00Z'
      const timeZone = 'Europe/Paris'

      // when
      const stringifyDate = stringify(date)(timeZone)

      // then
      expect(stringifyDate).toBe('Lundi 08/07/2019 à 22:00')
    })
  })

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
      const state = {
        data: {
          recommendations: [
            {
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
            },
          ],
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
      const detailsUrl = `${pathname}/details/${bookingId}${search}`
      const timeZone = 'Europe/Paris'
      const stringifyDate = stringify(beginningDatetime)(timeZone)
      const expected = {
        detailsUrl,
        isCancelled,
        productName,
        stringifyDate,
        timeZone,
        thumbUrl,
        token: 'bbbb',
      }
      expect(props).toStrictEqual(expected)
    })
  })
})

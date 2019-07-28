import { mapStateToProps } from '../MyBookingsListsContainer'

describe('src | components | pages | my-bookings | MyBookingsLists', () => {
  describe('mapStateToProps()', () => {
    it('should return my bookings', () => {
      // given
      const state = {
        data: {
          bookings: [],
          recommendations: [],
        },
      }

      // when
      const myBookings = mapStateToProps(state)

      // then
      expect(myBookings).toStrictEqual({
        myBookings: [],
        soonBookings: [],
      })
    })
  })
})

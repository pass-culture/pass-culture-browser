import { mapDispatchToProps } from '../MyBookingsContainer'

describe('src | components | pages | my-bookings | MyBookings', () => {
  describe('mapDispatchToProps()', () => {
    it('should dispatch my bookings', () => {
      // given
      const dispatch = jest.fn()
      const handleFail = jest.fn()
      const handleSuccess = jest.fn()

      // when
      mapDispatchToProps(dispatch).requestGetBookings(handleFail, handleSuccess)

      // then
      expect(dispatch).toHaveBeenCalledWith({
        config: {
          apiPath: '/bookings',
          handleFail: expect.any(Function),
          handleSuccess: expect.any(Function),
          method: 'GET',
          normalizer: { recommendation: 'recommendations' },
        },
        type: 'REQUEST_DATA_GET_/BOOKINGS',
      })
    })
  })
})

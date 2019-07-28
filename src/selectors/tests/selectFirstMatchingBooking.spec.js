import selectFirstMatchingBookingByStocks from '../selectFirstMatchingBookingByStocks'

describe('src | selectors | selectFirstMatchingBookingByStocks', () => {
  it('should return a booking matching the first found stockId in stocks', () => {
    // given
    const stockId = 'BF'
    const matchingBooking = { id: 'AE', stockId }
    const bookings = [matchingBooking]
    const stocks = [{ id: stockId }]
    const state = {
      data: {
        bookings,
      },
    }

    // when
    const firstMatchingBooking = selectFirstMatchingBookingByStocks(state, stocks)

    // then
    expect(firstMatchingBooking).toStrictEqual(matchingBooking)
  })

  it('should return null when no found matching booking', () => {
    // given
    const stockId = 'wrong id'
    const bookings = [{ id: 'AE', stockId: 'AE' }]
    const stocks = [{ id: stockId }]
    const state = {
      data: {
        bookings,
      },
    }

    // when
    const firstMatchingBooking = selectFirstMatchingBookingByStocks(state, stocks)

    // then
    expect(firstMatchingBooking).toBeUndefined()
  })
})

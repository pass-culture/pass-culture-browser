import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, stockIds) {
  return stockIds && stockIds.map(s => s.id).join(' ')
}

export const selectFirstMatchingBookingByStocks = createCachedSelector(
  state => state.data.bookings,
  (state, stocks) => stocks.map(s => s.id),
  (bookings, stockIds) =>
    bookings.filter(b => !b.isCancelled).find(b => stockIds.includes(b.stockId))
)(mapArgsToCacheKey)

export default selectFirstMatchingBookingByStocks

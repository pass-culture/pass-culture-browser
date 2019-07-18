const getIsBooking = match => {
  const { params } = match
  const { bookings } = params
  return typeof bookings !== 'undefined'
}

export default getIsBooking

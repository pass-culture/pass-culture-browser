import get from 'lodash.get'
import moment from 'moment'
import { createSelector } from 'reselect'

import selectValidBookings from './selectValidBookings'

export const filterBookingsInMoreThanTwoDaysOrPast = (bookings, now) => {
  const nowMoment = now || moment()
  const twoDaysFromNow = nowMoment.clone().add(2, 'days')
  const filteredBookings = bookings.filter(booking => {
    const date = get(booking, 'stock.beginningDatetime')
    const hasBeginningDatetime = Boolean(date)
    const isBeforeNow = moment(date).isBefore(nowMoment)
    const isAfterTwoDays = moment(date).isAfter(twoDaysFromNow)
    return !hasBeginningDatetime || isAfterTwoDays || isBeforeNow
  })
  return filteredBookings
}

const selectMyBookings = createSelector(
  selectValidBookings,
  validBookings => filterBookingsInMoreThanTwoDaysOrPast(validBookings)
)

export default selectMyBookings

import { createSelector } from 'reselect'

import getIsNotAnActivationRecommendation from '../helpers/getIsNotAnActivationRecommendation'

export const selectValidBookings = createSelector(
  state => state.data.bookings,
  state => state.data.recommendations,
  (bookings, recommendations) =>
    recommendations
      .filter(getIsNotAnActivationRecommendation)
      .map(recommendation =>
        bookings.find(booking => booking.recommendationId === recommendation.id)
      )
)

export default selectValidBookings

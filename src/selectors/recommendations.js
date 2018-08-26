import get from 'lodash.get'
import { createSelector } from 'reselect'

import { THUMBS_URL } from '../utils/config'
import { distanceInMeters } from '../utils/geolocation'
import {
  filterUniqRecommendations,
  getTimezone,
  humanizeDistance,
} from '../helpers'

const recommendationsSelector = createSelector(
  state => state.data.recommendations,
  state => state.geolocation.latitude,
  state => state.geolocation.longitude,
  (allRecommendations, lat, lon) => {
    // NOTE -> !!! prevents original state to be mutated
    const clone = [].concat(allRecommendations)
    const filtered = filterUniqRecommendations(clone)
    const parsed = filtered.map((recommendation, index) => {
      const offer = get(recommendation, 'offer')
      const venue = get(recommendation, 'offer.venue')
      const mediation = get(recommendation, 'mediation')
      const mediationId = get(mediation, 'id')
      const { eventId, thingId, eventOrThing } = offer || {}

      // thumbUrl
      let thumbUrl
      let firstThumbDominantColor
      if (mediationId) {
        thumbUrl = `${THUMBS_URL}/mediations/${mediationId}`
        firstThumbDominantColor = get(mediation, 'firstThumbDominantColor')
      } else if (eventId) {
        thumbUrl = `${THUMBS_URL}/events/${eventId}`
        firstThumbDominantColor = get(eventOrThing, 'firstThumbDominantColor')
      } else {
        thumbUrl = thingId && `${THUMBS_URL}/things/${thingId}`
        firstThumbDominantColor = get(eventOrThing, 'firstThumbDominantColor')
      }

      // distance
      let distance = '-'
      const canCalculateDistance = lat && lon && venue
      if (canCalculateDistance) {
        distance = distanceInMeters(lat, lon, venue.latitude, venue.longitude)
        distance = humanizeDistance(distance)
      }

      // timezone
      const departementCode = get(venue, 'departementCode')
      const tz = getTimezone(departementCode)

      // return
      const extended = {
        distance,
        firstThumbDominantColor,
        index,
        thumbUrl,
        tz,
      }
      return Object.assign(extended, recommendation)
    })

    return parsed
  }
)

export default recommendationsSelector

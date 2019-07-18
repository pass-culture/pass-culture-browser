import get from 'lodash.get'
import uniqBy from 'lodash.uniqby'
import { createSelector } from 'reselect'

import { ROOT_PATH } from '../../../../utils/config'
import { computeDistanceInMeters, humanizeDistance } from '../../../../utils/geolocation'
import { setUniqIdOnRecommendation } from '../../../../utils/recommendation'
import { getTimezone } from '../../../../utils/timezone'

export const fakeLastRecommendation = {
  mediation: {
    firstThumbDominantColor: [205, 54, 70],
    frontText:
      'Vous avez parcouru toutes les offres. Revenez bientôt pour découvrir les nouveautés.',
    id: 'fin',
    thumbCount: 1,
    tutoIndex: -1,
  },
  mediationId: 'fin',
  thumbUrl: `${ROOT_PATH}/splash-finReco@2x.png`,
  uniqId: 'tuto_-1',
}

const selectRecommendations = createSelector(
  state => state.data.recommendations,
  state => state.geolocation.latitude,
  state => state.geolocation.longitude,
  (recommendations, latitude, longitude) => {
    // RECOMMENDATION MUST HAVE MEDIATION AND/OR OFFER CHILDREN
    // AND THAT IS A CRITERION TO MAKE THEM UNIQ
    let filteredRecommendations = recommendations.map(setUniqIdOnRecommendation)
    filteredRecommendations = filteredRecommendations.filter(
      recommendation => recommendation.uniqId
    )
    filteredRecommendations = uniqBy(
      filteredRecommendations,
      recommendation => recommendation.uniqId
    )

    // NOW WE CAN GIVE OTHER PROPERTIES TO THE GOOD SHAPED RECO
    filteredRecommendations = filteredRecommendations.map((recommendation, index) => {
      const { mediation, offer } = recommendation
      const { product, venue } = offer || {}

      // FIXME Report the property computation on API side
      const firstThumbDominantColor =
        get(mediation, 'firstThumbDominantColor') || get(product, 'firstThumbDominantColor')

      let distance
      if (!latitude || !longitude || !offer || !venue) {
        distance = '-'
      } else {
        const distanceInMeters = computeDistanceInMeters(
          latitude,
          longitude,
          venue.latitude,
          venue.longitude
        )
        distance = humanizeDistance(distanceInMeters)
      }

      // timezone
      const tz = getTimezone(get(venue, 'departementCode'))

      // return
      return Object.assign(
        {
          distance,
          firstThumbDominantColor,
          index,
          tz,
        },
        recommendation
      )
    })

    filteredRecommendations.push(fakeLastRecommendation)

    return filteredRecommendations
  }
)

export default selectRecommendations

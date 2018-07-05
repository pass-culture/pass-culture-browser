import get from 'lodash.get'
import { createSelector } from 'reselect'

import selectRecommendationQuery from './recommendationQuery'
import selectRecommendationsWithIndex from './recommendationsWithIndex'
import getRecommendation from '../getters/recommendation'

export default createSelector(
  state => state.router.location.pathname,
  selectRecommendationsWithIndex,
  selectRecommendationQuery,
  (
    pathname,
    recommendations,
    recommendationQuery
  ) => {
    // NOTE: you will see that recommendationQuery is not actually
    // used in the body of this function, but it is still necessary
    // to trigger this selector again when /recommendations/<recommendationId>
    // requests has been called
    // (as the state.data.recommendations is not mutated through these kinds of calls)

    let filteredRecommendations

    console.log(pathname)
    let [, , occasionTypeAbbr, occasionId, mediationId] = pathname.split('/')
    if (occasionTypeAbbr === 'tuto') {
      mediationId = occasionId
      occasionId = undefined
    }

    if (occasionTypeAbbr && (occasionId || mediationId)) {
      filteredRecommendations = recommendations.filter(
        r => ((occasionTypeAbbr === 'e' && (r.eventId === occasionId || (r.mediation && r.mediation.eventId === occasionId)))
             || (occasionTypeAbbr === 'o' && (r.thingId === occasionId  || (r.mediation && r.mediation.thingId === occasionId)))
             || occasionTypeAbbr === 'tuto')
            && (!mediationId || r.mediationId === mediationId)
      )
    } else {
      filteredRecommendations = recommendations
    }

    const recommendation = filteredRecommendations[0]
    console.log("FINAL RECO", recommendation)

    const hydratedRecommendation = getRecommendation({
      recommendation,
      recommendations,
    })
    return hydratedRecommendation
  }
)

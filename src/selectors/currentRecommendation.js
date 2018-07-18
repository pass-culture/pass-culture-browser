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

    let [, , typeAbbr, eventOrThingId, mediationId] = pathname.split('/')

    if (typeAbbr && (eventOrThingId || mediationId)) {
      const base_filter_fn = reco => (!mediationId || reco.mediationId === mediationId)
      let filter_fn
      if (typeAbbr === 'tuto') {
        mediationId = eventOrThingId
        eventOrThingId = undefined
        filter_fn = base_filter_fn
      } else if (typeAbbr === 'e') {
        filter_fn = reco => base_filter_fn(reco) && (reco.eventId === eventOrThingId || (reco.mediation && reco.mediation.eventId === eventOrThingId))
      } else if (typeAbbr === 'o') {
        filter_fn = reco => base_filter_fn(reco) &&  (reco.thingId === eventOrThingId  || (reco.mediation && reco.mediation.thingId === eventOrThingId))
      }
      filteredRecommendations = recommendations.filter(filter_fn)
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

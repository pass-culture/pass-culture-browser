import get from 'lodash.get'
import { connect } from 'react-redux'
import { requestData } from 'redux-saga-data'

import VersoContentOffer from './VersoContentOffer'
import selectMusicTypeByCode from './selectors/selectMusicTypeByCode'
import selectMusicSubTypeByCodeAndSubCode from './selectors/selectMusicSubTypeByCodeAndSubCode'
import selectShowTypeByCode from './selectors/selectShowTypeByCode'
import selectShowSubTypeByCodeAndSubCode from './selectors/selectShowSubTypeByCodeAndSubCode'
import { isRecommendationOfferFinished } from '../../../../helpers'
import selectBookables from '../../../../selectors/selectBookables'

const getOnlineUrl = (recommendation, state) => {
  const stocks = get(recommendation, 'offer.stocks')
  const stockIds = (stocks || []).map(o => o.id)
  const bookings = state.data.bookings
  const booking = bookings.find(b => stockIds.includes(b.stockId))
  const onlineOfferUrl = get(booking, 'completedUrl')
  return onlineOfferUrl
}

export const mapStateToProps = (state, ownProps) => {
  const { recommendation } = ownProps
  const { offerId } = recommendation

  const bookables = selectBookables(state, recommendation)
  const isFinished = isRecommendationOfferFinished(recommendation, offerId)

  const extraData = get(recommendation, 'offer.product.extraData')
  const musicType = selectMusicTypeByCode(state, get(extraData, 'musicType'))
  const showType = selectShowTypeByCode(state, get(extraData, 'showType'))
  const musicSubType = selectMusicSubTypeByCodeAndSubCode(
    state,
    get(extraData, 'musicType'),
    get(extraData, 'musicSubType')
  )
  const showSubType = selectShowSubTypeByCodeAndSubCode(
    state,
    get(extraData, 'showType'),
    get(extraData, 'showSubType')
  )

  const onlineOfferUrl = getOnlineUrl(recommendation, state)

  return {
    bookables,
    isFinished,
    musicSubType,
    musicType,
    musicTypes: get(state, 'data.musicTypes'),
    onlineOfferUrl,
    showSubType,
    showType,
    showTypes: get(state, 'data.showTypes'),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { musicTypes, showTypes } = ownProps
  return {
    handleRequestMusicAndShowTypes: () => {
      if (!musicTypes) {
        dispatch(
          requestData({
            apiPath: '/musicTypes',
          })
        )
      }
      if (!showTypes) {
        dispatch(
          requestData({
            apiPath: '/showTypes',
          })
        )
      }
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersoContentOffer)

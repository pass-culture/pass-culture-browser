import moment from 'moment'
import { capitalize } from 'react-final-form-utils'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import BookingItem from './BookingItem'
import selectRecommendationById from '../../selectors/selectRecommendationById'
import { getTimezone } from '../../../../../utils/timezone'

export const stringify = date => timeZone =>
  capitalize(
    moment(date)
      .tz(timeZone)
      .format('dddd DD/MM/YYYY à H:mm')
  )

export const mapStateToProps = (state, ownProps) => {
  const { booking, location } = ownProps
  const { pathname, search } = location
  const { id: bookingId, isCancelled, recommendationId, stock, token } = booking
  const recommendation = selectRecommendationById(state, recommendationId)
  const { beginningDatetime } = stock
  const { offer, thumbUrl } = recommendation
  const { product, venue } = offer
  const { name: productName } = product
  const { departementCode } = venue
  const detailsUrl = `${pathname}/details/${bookingId}${search}`
  const timeZone = getTimezone(departementCode)
  const stringifyDate = beginningDatetime && stringify(beginningDatetime)(timeZone)

  return {
    detailsUrl,
    isCancelled,
    productName,
    stringifyDate,
    timeZone,
    thumbUrl,
    token: token.toLowerCase(),
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(BookingItem)

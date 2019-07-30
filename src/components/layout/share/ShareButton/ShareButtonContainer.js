import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { selectCurrentUser } from 'with-react-redux-login'

import ShareButton from './ShareButton'
import { getShareURL } from '../../../../helpers'
import { getShare } from '../../../../selectors/shareSelectors'

export const mapStateToProps = (state, ownProps) => {
  const {
    recommendation
  } = ownProps
  const { mediationId, offer, offerId } = recommendation
  const { name: offerName } = offer
  const text = offerName && `Retrouvez ${offerName} sur le pass Culture`
  const user = selectCurrentUser(state)
  const url = getShareURL(user, offerId, mediationId)

  return {
    offerName,
    text,
    url,
    ...getShare(state),
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ShareButton)

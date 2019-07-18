import React from 'react'
import PropTypes from 'prop-types'

import BookThisLinkContainer from './booking/book-this-link/BookThisLinkContainer'
import CancelThisLinkContainer from './booking/cancel-this-link/CancelThisLinkContainer'
import FavoriteContainer from './favorite/FavoriteContainer'
import VersoWalletContainer from './wallet/VersoWalletContainer'
import Finishable from '../../layout/Finishable'
import ShareButtonContainer from '../../share/ShareButton/ShareButtonContainer'
import { isRecommendationOfferFinished } from '../../../helpers'

const VersoControls = ({ booking, recommendation }) => {
  const { offerId } = recommendation
  const { isUsed } = booking || {}
  const isFinished = isRecommendationOfferFinished(recommendation, offerId) || (isUsed || false)
  return (
    <div className="verso-control is-relative">
      <ul className="py8 px12 is-medium is-flex flex-0 flex-between items-center pc-theme-red">
        <li>
          <VersoWalletContainer />
        </li>
        <li>
          <FavoriteContainer
            booking={booking}
            recommendation={recommendation}
          />
        </li>
        <li>
          <ShareButtonContainer recommendation={recommendation} />
        </li>
        <li className="is-relative">
          {booking ? (
            <CancelThisLinkContainer
              booking={booking}
              isFinished={isFinished}
              recommendation={recommendation}
            />
          ) : (
            <BookThisLinkContainer
              isFinished={isFinished}
              recommendation={recommendation}
            />
          )}
        </li>
      </ul>
      <Finishable finished={isFinished} />
    </div>
  )
}

VersoControls.defaultProps = {
  booking: null,
}

VersoControls.propTypes = {
  booking: PropTypes.shape(),
  recommendation: PropTypes.shape().isRequired,
}

export default VersoControls

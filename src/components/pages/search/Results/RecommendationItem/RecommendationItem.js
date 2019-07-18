import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import { getRecommendationDateString } from '../../helpers'
import { ICONS_URL } from '../../../../../utils/config'

const DEFAULT_THUMB_URL = `${ICONS_URL}/magnify.svg`

const RecommendationItem = ({ handleMarkSearchRecommendationsAsClicked, recommendation }) => {
  const { offer, thumbUrl } = recommendation
  const { name: offerName, product } = offer || {}
  return (
    <li className="recommendation-list-item">
      <div
        className="to-details"
        onClick={handleMarkSearchRecommendationsAsClicked}
        onKeyPress={handleMarkSearchRecommendationsAsClicked}
        role="button"
        tabIndex={0}
      >
        <hr className="dotted-top-primary" />
        <div className="flex-columns">
          <div className="image flex-0 dotted-right-primary flex-rows flex-center">
            <img
              alt=""
              src={thumbUrl || DEFAULT_THUMB_URL}
            />
          </div>
          <div className="m18 flex-1">
            {recommendation.offer && (
              <Fragment>
                <h5
                  className="fs18 is-bold"
                  title={offerName}
                >
                  {offerName}
                </h5>
                <div className="fs13">{product.offerType.appLabel}</div>
                <div
                  className="fs13"
                  id="recommendation-date"
                >
                  {offer && getRecommendationDateString(offer)}
                </div>
              </Fragment>
            )}
          </div>
          <div className="flex-center items-center is-primary-text">
            <span
              aria-hidden
              className="icon-legacy-next"
              title=""
            />
          </div>
        </div>
      </div>
    </li>
  )
}

RecommendationItem.propTypes = {
  handleMarkSearchRecommendationsAsClicked: PropTypes.func.isRequired,
  recommendation: PropTypes.shape().isRequired,
}

export default RecommendationItem

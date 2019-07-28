import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import VersoControls from './verso-controls/VersoControls'
import VersoContentOfferContainer from './verso-content/verso-content-offer/VersoContentOfferContainer'
import VersoContentTuto from './verso-content/VersoContentTuto'
import VersoHeaderContainer from './verso-content/VersoHeaderContainer'
import AbsoluteFooterContainer from '../layout/AbsoluteFooter/AbsoluteFooterContainer'
import {
  checkIsTuto,
  getBackgroundColor,
  getContentInlineStyle,
  getOfferName,
  getOfferVenueNameOrPublicName,
} from './helpers'

const Verso = ({ areDetailsVisible, booking, extraClassName, recommendation }) => {
  const backgroundColor = getBackgroundColor(recommendation)
  const contentInlineStyle = getContentInlineStyle(recommendation)
  const isTuto = checkIsTuto(recommendation)
  const offerName = getOfferName(recommendation)
  const offerVenueNameOrPublicName = getOfferVenueNameOrPublicName(recommendation)
  const { thumbUrl } = recommendation

  return (
    <div
      className={classnames('verso is-overlay', extraClassName, {
        flipped: areDetailsVisible,
      })}
    >
      <div className="verso-wrapper is-black-text scroll-y flex-rows is-relative text-left">
        <VersoHeaderContainer
          backgroundColor={backgroundColor}
          subtitle={offerVenueNameOrPublicName}
          title={offerName}
        />
        {!isTuto && <VersoControls
          booking={booking}
          recommendation={recommendation}
                    />}
        <div
          className="verso-content"
          style={contentInlineStyle}
        >
          {isTuto ? (
            <VersoContentTuto
              imageURL={thumbUrl}
              recommendation={recommendation}
            />
          ) : (
            <VersoContentOfferContainer
              booking={booking}
              recommendation={recommendation}
            />
          )}
        </div>
      </div>
      <AbsoluteFooterContainer
        areDetailsVisible={areDetailsVisible}
        borderTop
        colored={!isTuto}
        id="verso-footer"
      />
    </div>
  )
}

Verso.defaultProps = {
  booking: null,
  extraClassName: null,
  recommendation: null,
}

Verso.propTypes = {
  areDetailsVisible: PropTypes.bool.isRequired,
  booking: PropTypes.shape(),
  extraClassName: PropTypes.string,
  recommendation: PropTypes.shape(),
}

export default Verso

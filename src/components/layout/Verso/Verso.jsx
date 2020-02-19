import PropTypes from 'prop-types'
import React, { createRef, PureComponent } from 'react'

import AbsoluteFooterContainer from '../AbsoluteFooter/AbsoluteFooterContainer'
import VersoContentOfferContainer from './VersoContent/VersoContentOffer/VersoContentOfferContainer'
import VersoContentTutoContainer from './VersoContent/VersoContentTuto/VersoContentTutoContainer'
import VersoControlsContainer from './VersoControls/VersoControlsContainer'
import VersoHeaderContainer from './VersoHeader/VersoHeaderContainer'

class Verso extends PureComponent {
  constructor(props) {
    super(props)
    this.versoWrapper = createRef()
  }

  componentDidUpdate(prevProps) {
    const propsHaveBeenUpdated = prevProps !== this.props

    if (propsHaveBeenUpdated) {
      this.versoWrapper.current.scrollTop = 0
    }
  }

  render() {
    const {
      areDetailsVisible,
      extraClassNameVersoContent,
      extraClassName,
      isTuto,
      offerName,
      offerType,
      offerVenueNameOrPublicName,
    } = this.props

    return (
      <div className={`verso is-overlay ${extraClassName} ${areDetailsVisible ? 'flipped' : ''}`}>
        <div
          className="verso-wrapper"
          ref={this.versoWrapper}
        >
          <VersoHeaderContainer
            subtitle={offerVenueNameOrPublicName}
            title={offerName}
            type={offerType}
          />
          {!isTuto && <VersoControlsContainer />}
          <div className={`mosaic-background ${extraClassNameVersoContent}`}>
            {isTuto ? <VersoContentTutoContainer /> : <VersoContentOfferContainer />}
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
}

Verso.defaultProps = {
  extraClassName: '',
  extraClassNameVersoContent: 'verso-content',
  isTuto: null,
  offerName: null,
  offerType: null,
  offerVenueNameOrPublicName: null,
}

Verso.propTypes = {
  areDetailsVisible: PropTypes.bool.isRequired,
  extraClassName: PropTypes.string,
  extraClassNameVersoContent: PropTypes.string,
  isTuto: PropTypes.bool,
  offerName: PropTypes.string,
  offerType: PropTypes.string,
  offerVenueNameOrPublicName: PropTypes.string,
}

export default Verso

import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { withRouter } from 'react-router'
import { compose } from 'redux'

import OfferCard from './OfferCard'
// import OfferSlide fom './OfferSlide'
import withSelectors from '../hocs/withSelectors'

class OffersCaroussel extends Component {
  handleCardClick = index => {
    const { history, modulo, offers } = this.props
    let offerId = offers[modulo + 3*index].id;
    history.push('/offres/' + offerId);
  }
  render () {
    const { filteredOffers } = this.props
    return (
      <Carousel emulateTouch
        onClickItem={ index => this.handleCardClick(index) }
        showArrows={true}
        swipeScrollTolerance={2}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        transitionTime={250} >
        {
          filteredOffers && filteredOffers.map((offer, index) =>
            <OfferCard key={index} {...offer} />)
        }
      </Carousel>
    )
  }
}

export default compose(
  withRouter,
  withSelectors({
    filteredOffers: [
      ownProps => ownProps.carousselsCount,
      ownProps => ownProps.modulo,
      ownProps => ownProps.offers,
      (carousselsCount, modulo, offers) =>
        offers.filter((offer, index) => index % carousselsCount === modulo )
    ]
  })
)(OffersCaroussel)

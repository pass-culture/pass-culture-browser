import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { withRouter } from 'react-router'

import OfferCard from './OfferCard'
// import OfferSlide fom './OfferSlide'

class OffersCaroussel extends Component {
  handleCardClick = index => {
    const { history, modulo, offers } = this.props
    let offerId = offers[modulo + 3*index].id;
    history.push('/offres/' + offerId);
  }
  render () {
    const { carousselsCount, modulo, offers } = this.props;
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
          offers.filter((offer, index) => index % carousselsCount === modulo )
            .map((offer, index) => <OfferCard key={index} {...offer} />)
        }
      </Carousel>
    )
  }
}

export default withRouter(OffersCaroussel)

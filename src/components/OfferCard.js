import React from 'react'

import Icon from './Icon'
import withSelectors from '../hocs/withSelectors'
import { API_URL } from '../utils/config'

const OfferCard = ({ bargainPrices,
  id,
  name,
  sellersFavorites,
  sortedPrices,
  work
}) => {
  return (
    <div className='offer-card flex items-center justify-center'>
      <div className='offer-card__content relative' style={{
        backgroundImage: `url(${API_URL}/thumbs/${work.id})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}>
        <div className='offer-card__content__info absolute bottom-0 left-0 right-0 m2 p1'>
          à {(20-id)*15}m
        </div>
      </div>
    </div>
  )
}

export default withSelectors({
  bargainPrices: [
    ownProps => ownProps.prices,
    prices => prices.filter(p => p.groupSize>1)
  ],
  sortedPrices: [
    ownProps => ownProps.prices,
    prices => prices.sort((p1, p2) => p1.value > p2.value)
  ]
})(OfferCard)

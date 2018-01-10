import React, { Component } from 'react'
import { connect } from 'react-redux'

import Icon from './Icon'
import DeleteButton from './DeleteButton'
import EditOffer from './EditOffer'
import { showModal } from '../reducers/modal'

class OfferItem extends Component {
  onClick = action => {
    const { showModal } = this.props
    showModal(<EditOffer {...this.props} />)
  }
  render () {
    const { id,
      name,
      // style,
      work,
      thumbnailUrl
    } = this.props
    // const { imgStyle } = style
    return (
      <div className='offer-item flex items-center justify-between p1 mb1'>
        <button className='button button--alive mr2'
          onClick={() => this.onClick('edit')}
        >
          <Icon name='edit' />
        </button>
        <img alt='thumbnail'
          className='offer-item__image mr2'
          src={thumbnailUrl || work.thumbnailUrl}
        />
        <div className='offer-item__info flex-auto'>
          {name}
        </div>
        <DeleteButton collectionName='offers' id={id} />
      </div>
    )
  }
}

OfferItem.defaultProps = {
  /*
  style: { alignItems: 'center',
    display: 'flex',
    imgStyle: {
      height: '5rem',
      width: '5rem'
    },
    width: '20rem'
  }
  */
}

export default connect(null, { showModal })(OfferItem)

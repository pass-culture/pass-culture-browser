import React, { Component } from 'react'
import { connect } from 'react-redux'

import Icon from './Icon'
import OfferForm from './OfferForm'
import { showModal } from '../reducers/modal'

class OfferItem extends Component {
  onClick = action => {
    const { id, showModal } = this.props
    showModal(<OfferForm action={action} id={id} />)
  }
  render () {
    const { name,
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
        <button className='button button--alive'
          onClick={() => this.onClick('delete')}
        >
          <Icon name='delete' />
        </button>
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

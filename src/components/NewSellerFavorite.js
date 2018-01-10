import React, { Component } from 'react'

import Icon from './Icon'

class NewSellerFavorite extends Component {
  render () {
    return (
      <div className='new-seller-favorite'>
        <Icon name='add' />
        <Icon name='favorite-outline' />
      </div>
    )
  }
}

export default NewSellerFavorite

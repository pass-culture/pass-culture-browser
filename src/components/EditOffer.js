import React, { Component }  from 'react'

import FormInput from './FormInput'
import FormTextarea from './FormTextarea'
import Icon from './Icon'
import PriceItem from './PriceItem'
import SellerFavorite from './SellerFavorite'

class EditOffer extends Component {
  onAddFavoriteClick = () => {
    console.log('qsdqs')
  }
  onAddPriceClick = () => {
    console.log('qsdqs')
  }
  render () {
    const { comment,
      name,
      sellersFavorites,
      thumbnailUrl,
      prices,
      work
    } = this.props
    return (
      <div className='edit-offer p2'>

        <FormInput className='input mb1'
          defaultValue={name}
          name='name'
          placeholder="titre de l'offre"
        />
        <div className='sep mb2' />
        <div className='edit-offer__hero flex flex-wrap items-center justify-around mb2 p1'>
          <img alt='thumbnail'
            className='edit-offer__image mb1'
            src={thumbnailUrl || work.thumbnailUrl}
          />
          <FormTextarea defaultValue={comment}
            name='comment'
            placeholder="Vous pouvez écrire un commentaire ici"
          >
            {comment}
          </FormTextarea>
        </div>

        <div className='sep mb2' />

        <div className='h2 mb2'>
          Coups de Coeur
        </div>
        <div className='flex items-center flex-start'>
          <button className='button button--alive mb1 left-align' onClick={this.onAddFavoriteClick}>
            <Icon name='add' />
          </button>
        </div>
        {
          sellersFavorites && sellersFavorites.map((favorite, index) => (
            <SellerFavorite key={index} {...favorite} />
          ))
        }

        <div className='sep mb2' />

        <div className='h2 mb2'>
          Prix
        </div>
        <div className='flex items-center flex-start'>
          <button className='button button--alive' onClick={this.onAddPriceClick}>
            <Icon name='add' />
          </button>
        </div>
        {
          prices && prices.map((price, index) => {
            <PriceItem key={index} {...price} />
          })
        }
      </div>
    )
  }
}

export default EditOffer

import React  from 'react'

import FormInput from './FormInput'
import FormTextarea from './FormTextarea'
import NewSellerFavorite from './NewSellerFavorite'
import PriceItem from './PriceItem'
import SellerFavorite from './SellerFavorite'
import { assignForm } from '../reducers/form'

const EditOffer = ({ comment,
  name,
  sellersFavorites,
  thumbnailUrl,
  prices,
  work
}) => {
  return (
    <div className='edit-offer'>
      <FormInput className='input mb2'
        defaultValue={name}
        name='name'
        placeholder="titre de l'offre"
      />
      <div className='edit-offer__hero flex items-center justify-around mb2 p1'>
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
      {
        sellersFavorites && sellersFavorites.map((favorite, index) => (
          <SellerFavorite key={index} {...favorite} />
        ))
      }
      <NewSellerFavorite />
      {
        prices && prices.map((price, index) => {
          <PriceItem key={index} {...price} />
        })
      }
    </div>
  )
}

export default EditOffer

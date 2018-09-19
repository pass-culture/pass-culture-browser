import React from 'react'

const noop = () => {}

const FavoriteButton = () => (
  <button
    disabled
    type="button"
    onClick={noop}
    className="button is-secondary fs32"
  >
    <span
      aria-hidden
      // NOTE -> en attendant le patch qui permettra de gérer
      // les favoris user via une table on désactive la fonctionnalité
      className="ico-like"
      title="Retirer des favoris"
      // title={`${isFavorite ? 'Retirer des' : 'Ajouter aux'} favoris`}
    />
  </button>
)

export default FavoriteButton

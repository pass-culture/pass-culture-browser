import PropTypes from 'prop-types'
import React from 'react'
import Icon from '../../../layout/Icon/Icon'

export const EmptySearchResult = ({ searchedKeywords, onNewSearchAroundMe }) => (
  <div className='empty-search-result-wrapper'>
    <Icon svg="ico-no-offer" />
    <span>
      {'Oups !'}
    </span>
    <p>
      <div>
        {'Pas de résultat trouvé pour'}
      </div>
      <div>
        {`"${searchedKeywords}"`}
      </div>
    </p>
    <p>
      {'Modifie ta recherche ou découvre toutes les offres '}
      <button
        onClick={onNewSearchAroundMe}
        type="button"
      >
        {'autour de chez toi'}
      </button>
    </p>
  </div>
)

EmptySearchResult.propTypes = {
  onNewSearchAroundMe: PropTypes.func.isRequired,
  searchedKeywords: PropTypes.string.isRequired,
}
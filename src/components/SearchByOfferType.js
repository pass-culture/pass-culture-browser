import PropTypes from 'prop-types'
import React from 'react'

const SearchByOfferType = ({ handleQueryParamsChange, title }) => (
  <div>
    <h2>
      {title}
    </h2>
    <div className="field checkbox">
      <label id="from_date" className="label">
        {' '}
        Applaudir
      </label>
      <input
        id="from_date"
        className="input is-normal"
        onChange={() => handleQueryParamsChange({ type: 'Applaudir' })}
        type="checkbox"
      />
    </div>
    <div className="field checkbox">
      <label id="from_date" className="label">
        {' '}
        Découvrir
      </label>
      <input
        id="from_date"
        className="input is-normal"
        onChange={() => handleQueryParamsChange({ type: 'Découvrir' })}
        type="checkbox"
      />
    </div>
    <div className="field checkbox">
      <label id="from_date" className="label">
        {' '}
        Ecouter
      </label>
      <input
        id="from_date"
        className="input is-normal"
        onChange={() => handleQueryParamsChange({ type: 'Écouter' })}
        type="checkbox"
      />
    </div>
    <div className="field checkbox">
      <label id="from_date" className="label">
        {' '}
        Jouer
      </label>
      <input
        id="from_date"
        className="input is-normal"
        onChange={() => handleQueryParamsChange({ type: 'Jouer' })}
        type="checkbox"
      />
    </div>
    <div className="field checkbox">
      <label id="from_date" className="label">
        {' '}
        Lire
      </label>
      <input
        id="from_date"
        className="input is-normal"
        onChange={() => handleQueryParamsChange({ type: 'Lire' })}
        type="checkbox"
      />
    </div>
    <div className="field checkbox">
      <label id="from_date" className="label">
        {' '}
        Pratiquer
      </label>
      <input
        id="from_date"
        className="input is-normal"
        onChange={() => handleQueryParamsChange({ type: 'Pratiquer' })}
        type="checkbox"
      />
    </div>
    <div className="field checkbox">
      <label id="from_date" className="label">
        {' '}
        Regarder
      </label>
      <input
        id="from_date"
        className="input is-normal"
        onChange={() => handleQueryParamsChange({ type: 'Regarder' })}
        type="checkbox"
      />
    </div>
  </div>
)

SearchByOfferType.propTypes = {
  handleQueryParamsChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}
export default SearchByOfferType

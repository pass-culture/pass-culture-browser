import PropTypes from 'prop-types'
import moment from 'moment'
import React, { Component } from 'react'

class SearchFilter extends Component {
  constructor(props) {
    super(props)
    this.state = { distance: '' }
  }

  render() {
    const { handleClearQueryParams, handleQueryParamsChange } = this.props

    return (
      <div className="search-filter">
        <form />
        <div>
          <h2>
DATE
          </h2>
          <div className="field checkbox">
            <label id="from_date" className="label">
              {' '}
              {/*eslint-disable-line */}
              Tout de suite !
            </label>
            <input
              id="from_date"
              className="input is-normal"
              onChange={() =>
                handleQueryParamsChange({ from_date: moment.now() })
              }
              type="checkbox"
            />
          </div>
          <div className="field checkbox">
            <label id="from_date" className="label">
              {' '}
              {/*eslint-disable-line */}
              Entre 1 et 5 jours
            </label>
            <input
              id="from_date"
              className="input is-normal"
              onChange={() =>
                handleQueryParamsChange({ from_date: moment.now() })
              }
              type="checkbox"
            />
          </div>
        </div>
        <div>
          <h2>
DISTANCE
          </h2>
          <select
            className="select"
            value={this.state.distance} // eslint-disable-line
            onChange={() => handleQueryParamsChange(this.state)}
            name="select"
          >
            <option value="1">
              {' '}
Moins d'1 km
              {' '}
            </option>
            <option value="10">
Moins de 10 km
            </option>
            <option value="50">
Moins de 50 km
            </option>
            <option value="">
Toutes distances
            </option>
          </select>
        </div>
        <div>
          <h2>
QUOI
          </h2>
          <div className="field checkbox">
            <label id="from_date" className="label">
              {' '}
              {/*eslint-disable-line */}
              Applaudir
            </label>
            <input
              id="from_date"
              className="input is-normal"
              onChange={() =>
                handleQueryParamsChange({ from_date: moment.now() })
              }
              type="checkbox"
            />
          </div>
        </div>

        <button
          className="button"
          type="button"
          onClick={handleClearQueryParams}
        >
          Réinitialiser
        </button>
        <button className="button" type="submit">
          Filtrer
        </button>
      </div>
    )
  }
}

SearchFilter.propTypes = {
  handleClearQueryParams: PropTypes.func.isRequired,
  handleQueryParamsChange: PropTypes.func.isRequired,
}

export default SearchFilter

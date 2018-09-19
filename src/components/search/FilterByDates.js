import PropTypes from 'prop-types'
import React, { Component } from 'react'

const checkboxes = [
  {
    label: 'Tout de suite !',
    value: '0-1',
  },
  {
    label: 'Entre 1 et 5 jours',
    value: '1-5',
  },
  {
    label: 'Plus de 5 jours',
    // will the pass culture live for ever?
    // guess that 273 years are enough
    value: '5-100000',
  },
]

class FilterByDates extends Component {
  onFilterChange = typeSublabel => {
    const {
      handleQueryParamAdd,
      handleQueryParamRemove,
      queryParams,
    } = this.props

    const datesValue = decodeURI(queryParams.dates || '')

    const isAdded = datesValue.includes(typeSublabel)

    if (isAdded) {
      handleQueryParamRemove('dates', typeSublabel)
      return
    }

    handleQueryParamAdd('dates', typeSublabel)
  }

  render() {
    return (
      <div>
        <h2>
DATE (Scrollable horizontally)
        </h2>
        {checkboxes.map(({ label, value }) => (
          <div className="field field-checkbox" key={value}>
            <label className="label"> 
              {' '}
              {label}
            </label>
            <input
              className="input is-normal"
              onChange={() => this.onFilterChange(value)}
              type="checkbox"
            />
          </div>
        ))}
        <div>
Par date
        </div>
      </div>
    )
  }
}

FilterByDates.propTypes = {
  handleQueryParamAdd: PropTypes.func.isRequired,
  handleQueryParamRemove: PropTypes.func.isRequired,
  queryParams: PropTypes.object.isRequired,
}

export default FilterByDates

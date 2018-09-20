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
      handleFilterParamAdd,
      handleFilterParamRemove,
      filterParams,
    } = this.props

    const datesValue = decodeURI(filterParams.days_segments || '')

    const isAdded = datesValue.includes(typeSublabel)

    if (isAdded) {
      handleFilterParamRemove('days_segments', typeSublabel)
      return
    }

    handleFilterParamAdd('days_segments', typeSublabel)
  }

  render() {
    const { filterParams } = this.props

    const datesValue = decodeURI(filterParams.days_segments || '')

    console.log('datesValue', datesValue, checkboxes)

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
              checked={datesValue.includes(value)}
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
  filterParams: PropTypes.object.isRequired,
  handleFilterParamAdd: PropTypes.func.isRequired,
  handleFilterParamRemove: PropTypes.func.isRequired,
}

export default FilterByDates

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

// hope that pass culture is just still playing on earth
const INFINITE_DISTANCE = 20000

const options = [
  {
    label: "Moins d'1 km",
    value: 1,
  },
  {
    label: 'Moins de 10 km',
    value: 10,
  },
  {
    label: 'Moins de 50 km',
    value: 50,
  },
  {
    label: 'Toutes distances',
    value: INFINITE_DISTANCE,
  },
]

class FilterByDistance extends Component {
  onFilterChange = e => {
    const { geolocation, handleQueryParamsChange } = this.props

    const distance = e.target.value

    let { latitude, longitude } = geolocation
    if (distance === INFINITE_DISTANCE) {
      latitude = null
      longitude = null
    }

    handleQueryParamsChange({ distance, latitude, longitude })
  }

  render() {
    const { queryParams } = this.props
    const distanceValue = queryParams.distance || 20000

    return (
      <div>
        <select
          className="select"
          defaultValue={distanceValue}
          onChange={this.onFilterChange}
          name="distance"
        >
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

FilterByDistance.propTypes = {
  geolocation: PropTypes.object.isRequired,
  handleQueryParamsChange: PropTypes.func.isRequired,
  queryParams: PropTypes.object.isRequired,
}

export default connect(state => ({ geolocation: state.geolocation }))(
  FilterByDistance
)

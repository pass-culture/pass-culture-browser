import PropTypes from 'prop-types'
import React from 'react'

const options = [
  {
    label: 'Moins d&apos;1 km',
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
    // hope that pass culture is just still playing
    // on earth
    value: 20000,
  },
]

const FilterByDistance = ({ handleQueryParamsChange, queryParams }) => {
  const distanceValue = queryParams.distance || 20000

  return (
    <div>
      <select
        className="select"
        defaultValue={distanceValue}
        onChange={e => handleQueryParamsChange({ distance: e.target.value })}
        name="distance"
      >
        {options.map(({ label, value }) => (
          <option value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}

FilterByDistance.propTypes = {
  handleQueryParamsChange: PropTypes.func.isRequired,
  queryParams: PropTypes.object.isRequired,
}

export default FilterByDistance

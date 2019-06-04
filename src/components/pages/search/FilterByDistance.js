import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import options, {
  INFINITE_DISTANCE,
} from '../../../helpers/search/distanceOptions'

export class FilterByDistance extends PureComponent {
  onChangeDistance = event => {
    const { filterActions, geolocation } = this.props
    const distance = event.target.value
    let { latitude, longitude } = geolocation

    if (distance === INFINITE_DISTANCE) {
      latitude = null
      longitude = null
    }

    filterActions.change({ distance, latitude, longitude })
  }

  render() {
    const { filterState } = this.props
    const distanceValue = filterState.params.distance || 20000

    return (
      <React.Fragment>
        <div className="pt18 text-center mb20" id="filter-by-distance">
          <h2 className="fs15 is-italic is-medium is-uppercase text-center mb12">
            {'Où'}
          </h2>
          <select
            className="pc-selectbox pl24 py5 fs19"
            defaultValue={distanceValue}
            onChange={this.onChangeDistance}
          >
            {options.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <hr className="dotted-bottom-primary" />
      </React.Fragment>
    )
  }
}

FilterByDistance.propTypes = {
  filterActions: PropTypes.shape({
    add: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }).isRequired,
  filterState: PropTypes.shape({
    isNew: PropTypes.bool,
    params: PropTypes.shape({
      categories: PropTypes.string,
      date: PropTypes.string,
      distance: PropTypes.string,
      jours: PropTypes.string,
      latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      'mots-cles': PropTypes.string,
      orderBy: PropTypes.string,
    }),
  }).isRequired,
  geolocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    watchId: PropTypes.number,
  }).isRequired,
}

const mapStateToProps = state => ({
  geolocation: state.geolocation,
})

export const FilterByDistanceContainer = connect(mapStateToProps)(
  FilterByDistance
)

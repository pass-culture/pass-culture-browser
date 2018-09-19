import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import selectTypeSublabels from '../../selectors/selectTypeSublabels'

class FilterByOfferTypes extends Component {
  onFilterChange = typeSublabel => {
    const {
      handleQueryParamAdd,
      handleQueryParamRemove,
      queryParams,
    } = this.props

    const typesValue = decodeURI(queryParams.types || '')

    const isAdded = typesValue.includes(typeSublabel)

    if (isAdded) {
      handleQueryParamRemove('types', typeSublabel)
      return
    }

    handleQueryParamAdd('types', typeSublabel)
  }

  render() {
    const { queryParams, title, typeSublabels } = this.props

    const typesValue = decodeURI(queryParams.types || '')

    return (
      <div>
        <h2>
          {title}
        </h2>
        {typeSublabels.map(typeSublabel => (
          <div className="field field-checkbox" key={typeSublabel}>
            <label id="type" className="label">
              {' '}
              {typeSublabel}
            </label>
            <input
              checked={typesValue.includes(typeSublabel)}
              className="input is-normal"
              onChange={() => this.onFilterChange(typeSublabel)}
              value={typeSublabel}
              type="checkbox"
            />
          </div>
        ))}
      </div>
    )
  }
}

FilterByOfferTypes.propTypes = {
  handleQueryParamAdd: PropTypes.func.isRequired,
  handleQueryParamRemove: PropTypes.func.isRequired,
  queryParams: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  typeSublabels: PropTypes.array.isRequired,
}

export default connect(state => ({
  typeSublabels: selectTypeSublabels(state),
}))(FilterByOfferTypes)

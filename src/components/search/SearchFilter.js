/* eslint-disable */
import get from 'lodash.get'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import FilterByDates from './FilterByDates'
import FilterByDistance from './FilterByDistance'
import FilterByOfferTypes from './FilterByOfferTypes'

class SearchFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterParams: Object.assign({}, props.queryParams),
    }
  }

  componentDidUpdate(prevProps) {
    const { queryParams } = this.props
    // TODO: eslint does not support setState inside componentDidUpdate
    if (queryParams !== prevProps.queryParams) {
      this.setState({ filterParams: queryParams })
    }
  }

  onFilterClick = () => {
    const { handleQueryParamsChange } = this.props
    const { filterParams } = this.state

    handleQueryParamsChange(filterParams)
  }

  handleFilterParamsChange = newValue => {
    const { filterParams } = this.state

    const nextFilterParams = Object.assign({}, filterParams, newValue)

    this.setState({ filterParams: nextFilterParams })
  }

  handleFilterParamAdd = (key, value) => {
    const { filterParams } = this.state

    const encodedValue = encodeURI(value)
    let nextValue = encodedValue
    const previousValue = filterParams[key]
    if (get(previousValue, 'length')) {
      nextValue = `${previousValue},${encodedValue}`
    }

    this.handleFilterParamsChange({ [key]: nextValue })
  }

  handleFilterParamRemove = (key, value) => {
    const { filterParams } = this.state

    const previousValue = filterParams[key]

    if (get(previousValue, 'length')) {
      const encodedValue = encodeURI(value)
      let nextValue = previousValue
        .replace(`,${encodedValue}`, '')
        .replace(encodedValue, '')
      if (nextValue[0] === ',') {
        nextValue = nextValue.slice(1)
      }
      this.handleFilterParamsChange({ [key]: nextValue })
    }
  }

  render() {
    const { handleClearQueryParams } = this.props
    const { filterParams } = this.state
    return (
      <div
        id="search-filter-menu"
        className="is-overlay is-clipped flex-columns items-end p12">
        <div className="search-filter">
          <FilterByDates
            handleFilterParamAdd={this.handleFilterParamAdd}
            handleFilterParamRemove={this.handleFilterParamRemove}
            filterParams={filterParams}
          />
          <h2>OU</h2>
          <FilterByDistance
            handleFilterParamsChange={this.handleFilterParamsChange}
            filterParams={filterParams}
          />
          <FilterByOfferTypes
            handleFilterParamAdd={this.handleFilterParamAdd}
            handleFilterParamRemove={this.handleFilterParamRemove}
            filterParams={filterParams}
            title="QUOI"
          />
          <button
            className="button"
            type="button"
            onClick={handleClearQueryParams}>
            Réinitialiser
          </button>
          <button className="button" onClick={this.onFilterClick} type="button">
            Filtrer
          </button>
        </div>
      </div>
    )
  }
}

SearchFilter.propTypes = {
  handleClearQueryParams: PropTypes.func.isRequired,
  handleQueryParamsChange: PropTypes.func.isRequired,
  queryParams: PropTypes.object.isRequired,
}

export default SearchFilter

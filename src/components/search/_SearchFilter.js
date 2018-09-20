import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

import FilterByDates from './FilterByDates'
import FilterByDistance from './FilterByDistance'
import FilterByOfferTypes from './FilterByOfferTypes'

const transitionDelay = 250
const transitionDuration = 250

const defaultStyle = {
  opacity: '0',
  top: '100vh',
  transitionDuration: `${transitionDuration}ms`,
  transitionProperty: 'opacity, top',
  transitionTimingFunction: 'ease',
}

const transitionStyles = {
  entered: { opacity: 1, top: 0 },
  entering: { opacity: 0, top: '100vh' },
}

class SearchFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      handleClearQueryParams,
      handleQueryParamAdd,
      handleQueryParamRemove,
      handleQueryParamsChange,
      queryParams,
    } = this.props

    return (
      <Transition in timeout={transitionDelay}>
        {state => (
          <div
            id="search-filter-menu"
            className="is-overlay is-clipped flex-columns items-end p12"
            style={{ ...defaultStyle, ...transitionStyles[state] }}
          >
            <div className="search-filter">
              <FilterByDates
                handleQueryParamAdd={handleQueryParamAdd}
                handleQueryParamRemove={handleQueryParamRemove}
                queryParams={queryParams}
              />
              <h2>
OU
              </h2>
              <FilterByDistance
                handleQueryParamsChange={handleQueryParamsChange}
                queryParams={queryParams}
              />
              <FilterByOfferTypes
                handleQueryParamAdd={handleQueryParamAdd}
                handleQueryParamRemove={handleQueryParamRemove}
                queryParams={queryParams}
                title="QUOI"
              />
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
          </div>
        )}
      </Transition>
    )
  }
}

SearchFilter.propTypes = {
  handleClearQueryParams: PropTypes.func.isRequired,
  handleQueryParamAdd: PropTypes.func.isRequired,
  handleQueryParamRemove: PropTypes.func.isRequired,
  handleQueryParamsChange: PropTypes.func.isRequired,
  queryParams: PropTypes.object.isRequired,
}

export default SearchFilter

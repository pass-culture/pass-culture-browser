import get from 'lodash.get'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import {
  Icon,
  InfiniteScroller,
  pluralize,
  requestData,
  withLogin,
  withSearch,
} from 'pass-culture-shared'

import Footer from '../layout/Footer'
import Main from '../layout/Main'
import SearchFilter from '../search/SearchFilter'
import NavByOfferType from '../search/NavByOfferType'
import SearchResultItem from '../search/SearchResultItem'
import { selectRecommendations } from '../../selectors'
import { toggleFilterMenu } from '../../reducers/filter'
import { frenchQueryStringToEnglishQueryString } from '../../utils/string'

const renderPageHeader = () => (
  <header>
    <h1>
Recherche
    </h1>
  </header>
)

const renderPageFooter = () => {
  const footerProps = { borderTop: true, colored: true }
  return <Footer {...footerProps} />
}

class SearchPage extends Component {
  onFilterClick = () => {
    const { dispatch } = this.props
    dispatch(toggleFilterMenu())
  }

  handleDataRequest = (handleSuccess = () => {}, handleFail = () => {}) => {
    const { dispatch, goToNextSearchPage, location, querySearch } = this.props

    dispatch(requestData('GET', 'types'))

    const len = get(location, 'search.length')
    if (!len) return

    const frenchQuerySearch = frenchQueryStringToEnglishQueryString(querySearch)

    dispatch(
      requestData('GET', `recommendations?${frenchQuerySearch}`, {
        handleFail,
        handleSuccess: (state, action) => {
          handleSuccess(state, action)
          goToNextSearchPage()
        },
      })
    )
  }

  render() {
    const {
      handleClearQueryParams,
      handleKeywordsChange,
      handleQueryParamsChange,
      handleRemoveFilter,
      isVisible,
      queryParams,
      recommendations,
    } = this.props

    const keywords = queryParams['mots-cles']
    // https://stackoverflow.com/questions/37946229/how-do-i-reset-the-defaultvalue-for-a-react-input
    // WE NEED TO MAKE THE PARENT OF THE KEYWORD INPUT
    // DEPENDING ON THE KEYWORDS VALUE IN ORDER TO RERENDER
    // THE IN PUT WITH A SYNCED DEFAULT VALUE
    const keywordsKey = typeof keywords === 'undefined' ? 'empty' : 'not-empty'

    return (
      <Main
        handleDataRequest={this.handleDataRequest}
        header={renderPageHeader}
        name="search"
        footer={renderPageFooter}
      >
        <div>
          <form className="section" onSubmit={handleKeywordsChange}>
            <div className="field has-addons">
              <div className="control is-expanded" key={keywordsKey}>
                <input
                  id="keywords"
                  className="input search-input"
                  placeholder="Saisissez une recherche"
                  type="text"
                  defaultValue={keywords}
                />
              </div>
              <div className="control">
                <button className="button is-rounded is-medium" type="submit">
                  Chercher
                </button>
              </div>
              <button type="button" onClick={handleRemoveFilter('mots-cles')}>
                <Icon svg="ico-close-b" alt="Fermer" />
              </button>
              <button
                type="button"
                className="button is-secondary"
                onClick={this.onFilterClick}
              >
                &nbsp;
                <Icon svg="ico-filter" />
                &nbsp;
              </button>
              <button
                type="button"
                id="close-filter-menu"
                className="button is-secondary"
                onClick={this.onFilterClick}
              >
                &nbsp;
                <Icon svg="ico-chevron-up" />
                &nbsp;
              </button>
            </div>
          </form>
        </div>
        <SearchFilter
          handleQueryParamsChange={handleQueryParamsChange}
          handleRemoveFilter={handleRemoveFilter}
          handleClearQueryParams={handleClearQueryParams}
          isVisible={isVisible}
        />
        <InfiniteScroller
          className="recommendations-list main-list"
          handleLoadMore={this.handleDataRequest}
        >
          <h2>
            {keywords &&
              `"${keywords}" : ${pluralize(
                recommendations.length,
                'résultats'
              )}`}
          </h2>
          {recommendations.map(o => (
            <SearchResultItem key={o.id} recommendation={o} />
          ))}
        </InfiniteScroller>
        {recommendations &&
          recommendations.length === 0 && (
            <NavByOfferType
              handleQueryParamsChange={handleQueryParamsChange}
              title="PAR CATEGORIES"
            />
          )}
      </Main>
    )
  }
}

SearchPage.defaultProps = {
  querySearch: null,
}

SearchPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  goToNextSearchPage: PropTypes.func.isRequired,
  handleClearQueryParams: PropTypes.func.isRequired,
  handleKeywordsChange: PropTypes.func.isRequired,
  handleQueryParamsChange: PropTypes.func.isRequired,
  handleRemoveFilter: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  queryParams: PropTypes.object.isRequired,
  querySearch: PropTypes.string,
  recommendations: PropTypes.array.isRequired,
}

export default compose(
  withLogin({ failRedirect: '/connexion' }),
  withSearch({
    dataKey: 'recommendations',
    defaultQueryParams: {
      distance: undefined,
      from_date: undefined,
      [`mots-cles`]: undefined,
      type: undefined,
    },
    keywordsQueryString: 'mots-cles',
  }),
  connect(state => ({
    isVisible: state.filter,
    recommendations: selectRecommendations(state),
    user: state.user,
  }))
)(SearchPage)

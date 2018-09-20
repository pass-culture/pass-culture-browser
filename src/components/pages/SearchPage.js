import get from 'lodash.get'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
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
import NavByOfferType from '../search/NavByOfferType'
import SearchFilter from '../search/SearchFilter'
import SearchResultItem from '../search/SearchResultItem'
import { selectRecommendations } from '../../selectors'
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
  componentDidUpdate() {
    const { history, match, queryParams, querySearch } = this.props
    if (!match.params.resultats && queryParams['mots-cles']) {
      history.push(`/recherche/resultats?${querySearch}`)
    }
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
      handleQueryParamAdd,
      handleQueryParamRemove,
      handleQueryParamsChange,
      handleRemoveFilter,
      history,
      isVisible,
      match,
      queryParams,
      recommendations,
    } = this.props

    const keywords = queryParams['mots-cles']
    // https://stackoverflow.com/questions/37946229/how-do-i-reset-the-defaultvalue-for-a-react-input
    // WE NEED TO MAKE THE PARENT OF THE KEYWORD INPUT
    // DEPENDING ON THE KEYWORDS VALUE IN ORDER TO RERENDER
    // THE IN PUT WITH A SYNCED DEFAULT VALUE
    const keywordsKey = typeof keywords === 'undefined' ? 'empty' : 'not-empty'

    console.log('match.params.resultats', match.params.resultats)

    return (
      <Main
        handleDataRequest={this.handleDataRequest}
        header={renderPageHeader}
        name="search"
        footer={renderPageFooter}
      >
        <form
          className="section"
          onSubmit={e => {
            e.preventDefault()

            if (!e.target.elements.keywords.value) {
              return
            }

            handleQueryParamsChange({
              [`mots-cles`]: e.target.elements.keywords.value,
            })
          }}
        >
          <div className="field has-addons">
            <p
              className="control has-icons-right is-expanded"
              key={keywordsKey}
            >
              <input
                id="keywords"
                className="input search-input"
                placeholder="Saisissez une recherche"
                type="text"
                defaultValue={keywords}
              />
              {get(keywords, 'length') && (
                <span className="icon is-small is-right">
                  <button
                    type="button"
                    onClick={handleRemoveFilter('mots-cles')}
                  >
                    <Icon svg="ico-close-b" alt="Fermer" />
                  </button>
                </span>
              )}
            </p>
            <div className="control">
              <button className="button is-rounded is-medium" type="submit">
                Chercher
              </button>
            </div>
            <button
              type="button"
              className="button is-secondary"
              onClick={() =>
                history.push(
                  match.params.filter
                    ? '/recherche/resultats'
                    : '/recherche/resultats/filtres'
                )
              }
            >
              &nbsp;
              <Icon
                svg={`ico-${match.params.filter ? 'chevron-up' : 'filter'}`}
              />
              &nbsp;
            </button>
          </div>
        </form>

        <Switch>
          <Fragment>
            <Route
              path="/recherche"
              render={() => (
                <NavByOfferType
                  handleQueryParamsChange={handleQueryParamsChange}
                  title="PAR CATEGORIES"
                />
              )}
            />
            <Route
              path="/recherche/resultats"
              render={() => (
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
              )}
            />
            <Route
              path="/recherche/resultats/filtres"
              render={() => (
                <SearchFilter
                  handleClearQueryParams={handleClearQueryParams}
                  handleQueryParamAdd={handleQueryParamAdd}
                  handleQueryParamRemove={handleQueryParamRemove}
                  handleQueryParamsChange={handleQueryParamsChange}
                  handleRemoveFilter={handleRemoveFilter}
                  isVisible={isVisible}
                  queryParams={queryParams}
                />
              )}
            />
          </Fragment>
        </Switch>
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
  handleQueryParamAdd: PropTypes.func.isRequired,
  handleQueryParamRemove: PropTypes.func.isRequired,
  handleQueryParamsChange: PropTypes.func.isRequired,
  handleRemoveFilter: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
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

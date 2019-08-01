import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import MyFavoriteDetailsContainer from './MyFavoriteDetails/MyFavoriteDetailsContainer'
import MyFavoriteContainer from './MyFavorite/MyFavoriteContainer'
import PageHeader from '../../layout/Header/PageHeader'
import LoaderContainer from '../../layout/Loader/LoaderContainer'
import NoItems from '../../layout/NoItems/NoItems'
import RelativeFooterContainer from '../../layout/RelativeFooter/RelativeFooterContainer'
import getRemovedDetailsUrl from '../../../helpers/getRemovedDetailsUrl'

class MyFavorites extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      isLoading: true,
    }
  }

  componentDidMount = () => {
    const { requestGetMyFavorites } = this.props
    requestGetMyFavorites(this.handleFail, this.handleSuccess)
  }

  goBack = () => {
    const { location, match } = this.props
    return getRemovedDetailsUrl(location, match)
  }

  handleFail = () => {
    this.setState({
      hasError: true,
      isLoading: true,
    })
  }

  handleSuccess = () => {
    this.setState({
      isLoading: false,
    })
  }

  renderFavoritesList = () => {
    const { myFavorites } = this.props
    const isEmpty = myFavorites.length === 0

    return (
      <div className={classnames('page-content', {
          'teaser-no-teasers': isEmpty
        })}
      >
        {isEmpty && <NoItems sentence="Dès que vous aurez ajouté une offre en favori," />}

        {!isEmpty && (
          <section>
            <ul>
              {myFavorites.map(myFavorite => (
                <MyFavoriteContainer
                  favorite={myFavorite}
                  key={myFavorite.id}
                />
              ))}
            </ul>
          </section>
        )}
      </div>
    )
  }

  render() {
    const { isLoading, hasError } = this.state

    if (isLoading) {
      return (<LoaderContainer
        hasError={hasError}
        isLoading={isLoading}
              />)
    }

    return (
      <main
        className="teaser-list page with-header with-footer"
        role="main"
      >
        <PageHeader
          backTo={this.goBack()}
          title="Mes favoris"
        />
        {this.renderFavoritesList()}
        <MyFavoriteDetailsContainer />
        <RelativeFooterContainer
          className="dotted-top-red"
          theme="purple"
        />
      </main>
    )
  }
}

MyFavorites.defaultProps = {
  myFavorites: [],
}

MyFavorites.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      details: PropTypes.string,
    }).isRequired,
  }).isRequired,
  myFavorites: PropTypes.arrayOf(PropTypes.shape()),
  requestGetMyFavorites: PropTypes.func.isRequired,
}

export default MyFavorites

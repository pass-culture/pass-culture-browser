import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import MyBookingsListsContainer from './MyBookingsLists/MyBookingsListsContainer'
import MyBookingDetailsContainer from './MyBookingDetails/MyBookingDetailsContainer'
import LoaderContainer from '../../layout/Loader/LoaderContainer'
import PageHeader from '../../layout/Header/PageHeader'
import NoItems from '../../layout/NoItems/NoItems'
import getAreDetailsVisible from '../../../helpers/getAreDetailsVisible'
import getRemovedDetailsUrl from '../../../helpers/getRemovedDetailsUrl'

class MyBookings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      isLoading: true,
    }
  }

  componentDidMount = () => {
    const { requestGetBookings } = this.props
    requestGetBookings(this.handleFail, this.handleSuccess)
  }

  componentWillUnmount() {
    const { resetRecommendationsAndBookings } = this.props
    resetRecommendationsAndBookings()
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

  render() {
    const { match } = this.props
    const { hasError, isEmpty, isLoading } = this.state
    if (isLoading) {
      return (<LoaderContainer
        hasError={hasError}
        isLoading={isLoading}
              />)
    }

    const areDetailsVisible = getAreDetailsVisible(match)
    return (
      <main
        className={classnames(
          'my-bookings-page page teaser-main with-footer with-header', {
          'teaser-no-teasers no-bookings': isEmpty,
        })}
        role="main"
      >
        {isEmpty && <NoItems sentence="Dès que vous aurez réservé une offre," />}
        <PageHeader
          backTo={this.goBack()}
          title="Mes réservations"
        />
        {!areDetailsVisible && <MyBookingsListsContainer />}
        <MyBookingDetailsContainer />
      </main>
    )
  }
}

MyBookings.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      details: PropTypes.string,
    }).isRequired,
  }).isRequired,
  requestGetBookings: PropTypes.func.isRequired,
  resetRecommendationsAndBookings: PropTypes.func.isRequired,
}

export default MyBookings

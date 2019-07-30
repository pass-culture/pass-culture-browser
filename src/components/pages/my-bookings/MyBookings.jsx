import PropTypes from 'prop-types'
import React, { Component } from 'react'

import MyBookingsListsContainer from './MyBookingsLists/MyBookingsListsContainer'
import MyBookingDetailsContainer from './MyBookingDetails/MyBookingDetailsContainer'
import LoaderContainer from '../../layout/Loader/LoaderContainer'
import PageHeader from '../../layout/Header/PageHeader'
import getAreDetailsVisible from '../../../helpers/getAreDetailsVisible'
import getRemovedDetailsUrl from '../../../helpers/getRemovedDetailsUrl'

class MyBookings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      isEmpty: false,
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

  handleSuccess = (state, action) => {
    const { payload } = action
    const { data } = payload
    const isEmpty = data.length === 0
    this.setState({
      isEmpty,
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
        className={'my-bookings-page page with-footer with-header'}
        role="main"
      >
        <PageHeader
          backTo={this.goBack()}
          title="Mes réservations"
        />
        {!areDetailsVisible && <MyBookingsListsContainer isEmpty={isEmpty} />}
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

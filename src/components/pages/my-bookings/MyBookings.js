import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import LoaderContainer from '../../layout/Loader/LoaderContainer'
import MyBookingsListsContainer from './MyBookingsLists/MyBookingsListsContainer'
import MyBookingDetailsContainer from './MyBookingDetailsContainer'

import PageHeader from '../../layout/Header/PageHeader'

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
    const { location } = this.props
    const { pathname, search } = location
    const isDetails = pathname.includes('/details')
    if (isDetails) {
      return `${pathname.split('/details')[0]}${search}`
    }
  }

  handleFail = () => {
    this.setState({
      hasError: true,
      isLoading: true,
    })
  }

  handleSuccess = (state, action) => {
    this.setState({
      isEmpty: action.payload.data.length === 0,
      isLoading: false,
    })
  }

  renderMyBookingsLists = route => (<MyBookingsListsContainer
    {...route}
    {...this.state}
                                    />)

  renderMyBookingDetails = route => <MyBookingDetailsContainer {...route} />

  render() {
    const { location } = this.props
    const { hasError, isEmpty, isLoading } = this.state
    if (isLoading) {
      return (<LoaderContainer
        hasError={hasError}
        isLoading={isLoading}
              />)
    }

    return (
      <main
        className={classnames('my-bookings-page page with-footer with-header', {
          'no-bookings': isEmpty,
        })}
        role="main"
      >
        <PageHeader
          backTo={this.goBack()}
          title="Mes réservations"
        />
        <Switch location={location}>
          <Route
            exact
            path="/reservations"
            render={this.renderMyBookingsLists}
          />
          <Route
            path="/reservations/details/:bookingId([A-Z0-9]+)?/:cancellation(annulation)?/:confirmation(confirmation)?"
            render={this.renderMyBookingDetails}
          />
        </Switch>
      </main>
    )
  }
}

MyBookings.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({}).isRequired,
  requestGetBookings: PropTypes.func.isRequired,
  resetRecommendationsAndBookings: PropTypes.func.isRequired,
}

export default MyBookings

/* eslint
  react/jsx-one-expression-per-line: 0 */
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import MyBookingItem from './MyBookingItem'
import NoBookingView from './NoBookingView'
import { Loader } from '../../layout/Loader'
import PageHeader from '../../layout/PageHeader'
import NavigationFooter from '../../layout/NavigationFooter'
import { ROOT_PATH } from '../../../utils/config'

const backgroundImage = `url('${ROOT_PATH}/mosaic-k.png')`

const renderBookingList = items => (
  <ul className="bookings">
    {items.map(booking => {
      const key = booking.id
      return <MyBookingItem key={key} booking={booking} />
    })}
  </ul>
)

class MyBookingsPage extends Component {
  constructor(props) {
    super(props)
    this.state = { haserror: false, isempty: false, isloading: true }
  }

  componentWillMount = () => {
    const { fetchUserBookings } = this.props
    fetchUserBookings(this.handleRequestSuccess, this.handleRequestFail)
  }

  componentWillUnmount = () => {
    const { resetRecommendations } = this.props
    resetRecommendations()
  }

  handleRequestFail = () => {
    // ERREUR DE CHARGEMENT
    this.setState({ haserror: true, isloading: true })
  }

  handleRequestSuccess = (state, action) => {
    const {
      payload: { data },
    } = action
    const len = data.length
    const isempty = !(len && len > 0)
    this.setState({ isempty, isloading: false })
  }

  render() {
    const { soonBookings, otherBookings } = this.props
    const { isempty, isloading, haserror } = this.state
    // NOTE -> perfs: calculate length once
    const soonBookingsLength = soonBookings.length
    const otherBookingsLength = otherBookings.length
    const hasNoBooking = soonBookingsLength === 0 && otherBookingsLength === 0
    return (
      <div id="bookings-page" className="page is-relative flex-rows">
        {!isloading && (
          <React.Fragment>
            <PageHeader
              useClose
              title="Mes réservations"
              className="dotted-bottom-white"
            />
            <main
              role="main"
              className="pc-main pc-gradient flex-rows flex-start is-clipped"
            >
              <div className="pc-scroll-container" style={{ backgroundImage }}>
                {soonBookingsLength > 0 && (
                  <div className="px12 mt36">
                    <h4 className="mb16 fs19 is-uppercase is-white-text">
                      <i>C&apos;est bientôt !</i>
                    </h4>
                    {renderBookingList(soonBookings)}
                  </div>
                )}
                {otherBookingsLength > 0 && (
                  <div className="px12 my36">
                    <h4 className="mb16 fs19 is-uppercase is-white-text">
                      <i>Réservations</i>
                    </h4>
                    {renderBookingList(otherBookings)}
                  </div>
                )}
                {(isempty || hasNoBooking) && <NoBookingView />}
              </div>
            </main>
            <NavigationFooter theme="purple" className="dotted-top-white" />
          </React.Fragment>
        )}
        {!isempty && (
          <Loader isempty={isempty} haserror={haserror} isLoading={isloading} />
        )}
      </div>
    )
  }
}

MyBookingsPage.propTypes = {
  fetchUserBookings: PropTypes.func.isRequired,
  otherBookings: PropTypes.array.isRequired,
  resetRecommendations: PropTypes.func.isRequired,
  soonBookings: PropTypes.array.isRequired,
}

export default MyBookingsPage

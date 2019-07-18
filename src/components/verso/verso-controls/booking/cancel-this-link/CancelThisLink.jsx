import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { getIsCancelling } from '../../../helpers'
import Price from '../../../../layout/Price'

class CancelThisLink extends PureComponent {
  componentDidMount () {
    const { match, openCancelPopin } = this.props
    const isCancelling = getIsCancelling(match)
    if (isCancelling) {
      openCancelPopin()
    }
  }

  componentDidUpdate (prevProps) {
    const { match, openCancelPopin } = this.props
    const isCancelling = getIsCancelling(match)
    const previousIsCancelling = getIsCancelling(prevProps.match)
    if (isCancelling && !previousIsCancelling) {
      openCancelPopin()
    }
  }

  handleOnClick = () => {
    const {
      booking,
      history,
      location,
      match: { params },
      isFinished,
    } = this.props
    const { pathname, search } = location
    const { id: bookingId } = booking
    if (isFinished || params.cancellation) {
      return
    }
    let bookingUrl = pathname
    if (params.bookingId !== bookingId) {
      bookingUrl = `${bookingUrl}/reservations/${bookingId}`
    }
    bookingUrl = `${bookingUrl}/annulation${search}`
    history.push(bookingUrl)
  }

  render() {
    const { booking, isFinished } = this.props
    const { isCancelled, stock } = booking || {}
    const { price } = stock || {}

    return (
      <button
        className="flex-columns no-border no-background"
        disabled={isFinished}
        id="verso-cancel-booking-button"
        onClick={this.handleOnClick}
        type="button"
      >
        <span className="pc-ticket-button-price reserved">
          <Price
            free="Gratuit"
            value={price}
          />
          {!isCancelled && (
            <i
              className="icon-ico-check fs24"
              id="verso-cancel-booking-button-reserved"
            />
          )}
        </span>
        <span className="pc-ticket-button-label">{'Annuler'}</span>
      </button>
    )
  }
}

CancelThisLink.defaultProps = {
  isFinished: false
}

CancelThisLink.propTypes = {
  booking: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  isFinished: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      bookingId: PropTypes.string,
      cancellation: PropTypes.string
    }).isRequired
  }).isRequired,
  openCancelPopin: PropTypes.func.isRequired
}

export default CancelThisLink

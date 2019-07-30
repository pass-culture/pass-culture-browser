import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { requestData } from 'redux-saga-data'

import CancelThisLink from './CancelThisLink'
import PopinButton from './PopinButton'
import { closeSharePopin, openSharePopin } from '../../../../../../reducers/share'
import { bookingNormalizer } from '../../../../../../utils/normalizers'

export const mapDispatchToProps = (dispatch, ownProps) => {
  const { booking, history, location, recommendation } = ownProps
  const { pathname, search } = location
  const { offer } = recommendation
  const { name: offerName } = offer

  const handleOpenFailurePopin = (state, request) => {
    const { payload } = request
    const { errors } = payload
    const { booking: bookingError } = errors || {}
    const message = bookingError || ['Une erreur inconnue s’est produite']

    const options = {
      buttons: [
        PopinButton({
          id: 'popin-cancel-booking-fail-ok',
          label: 'OK',
          onClick: () => dispatch(closeSharePopin()),
        }),
      ],
      text: message.join('\n'),
      title: 'Annulation impossible',
    }
    dispatch(openSharePopin(options))
  }

  const handleSuccessPopin = () => {
    dispatch(closeSharePopin())
    const successUrl = `${pathname}/confirmation${search}`
    history.push(successUrl)
  }

  const requestPatchBooking = () => {
    dispatch(
      requestData({
        apiPath: `/bookings/${booking.id}`,
        body: { isCancelled: true },
        handleFail: handleOpenFailurePopin,
        handleSuccess: handleSuccessPopin,
        method: 'PATCH',
        normalizer: bookingNormalizer,
      })
    )
  }

  const handleClosePopin = () => {
    dispatch(closeSharePopin())
    const nextPathname = pathname.split('/annulation')[0]
    const nextUrl = `${nextPathname}${search}`
    history.push(nextUrl)
  }

  return {
    openCancelPopin: () => {
      const options = {
        buttons: [
          PopinButton({
            id: 'popin-cancel-booking-yes',
            label: 'Oui',
            onClick: requestPatchBooking,
          }),
          PopinButton({
            id: 'popin-cancel-booking-no',
            label: 'Non',
            onClick: handleClosePopin,
          }),
        ],
        text: 'Souhaitez-vous réellement annuler cette réservation ?',
        offerName,
      }
      dispatch(openSharePopin(options))
    },
  }
}

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(CancelThisLink)

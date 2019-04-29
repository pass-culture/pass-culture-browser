import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { toast } from 'react-toastify'
import { assignData, requestData } from 'redux-saga-data'

import DeckContainer from './deck/DeckContainer'
import BookingContainer from '../../booking/BookingContainer'
import BackButton from '../../layout/BackButton'
import { Loader } from '../../layout/Loader'
import Footer from '../../layout/Footer'
import { getQueryParams, shouldShowVerso } from '../../../helpers'
import { recommendationNormalizer } from '../../../utils/normalizers'
import { saveLastRecommendationsRequestTimestamp } from '../../../reducers/logs'

const showActivationPasswordSavedPopup = fromPassword => {
  // TODO: a deplacer dans le container
  if (!fromPassword) return
  const delay = 1000
  const autoClose = 3000
  const message = 'Votre mot de passe a bien été enregistré.'
  setTimeout(() => toast(message, { autoClose }), delay)
}

const showFirstRecommendation = (data, history) => {
  const firstRecommendation = (data && data[0]) || {}
  // NOTE -> si la premiere carte n'a pas d'offerid
  // alors il s'agit d'une carte tuto
  const firstOfferId =
    (firstRecommendation && firstRecommendation.offerId) || 'tuto'
  const firstMediationId =
    (firstRecommendation && firstRecommendation.mediationId) || ''
  // replace plutot qu'un push permet de recharger les données
  // quand on fait back dans le navigateur et qu'on revient
  // à l'URL /decouverte
  history.replace(`/decouverte/${firstOfferId}/${firstMediationId}`)
}

class Discovery extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      atWorldsEnd: false,
      hasError: false,
      isEmpty: null,
      isLoading: false,
    }
  }

  componentDidMount() {
    const {
      dispatch,
      history,
      fromPassword,
      recommendations,
      shouldLoadRecommendations,
    } = this.props
    showActivationPasswordSavedPopup(fromPassword)

    if (shouldLoadRecommendations) {
      // NOTE: doit on reset les recommendations ?
      this.handleDataRequest()
      dispatch(saveLastRecommendationsRequestTimestamp())
    } else {
      showFirstRecommendation(recommendations, history)
    }
  }

  handleRequestFail = () => {
    this.setState({ hasError: true, isLoading: true }, () => {
      const { history } = this.props
      const delayBeforeRedirect = 2000
      setTimeout(() => history.replace('/connexion'), delayBeforeRedirect)
    })
  }

  handleRequestSuccess = (state, action) => {
    const { dispatch, history, recommendations } = this.props
    const {
      payload: { data },
    } = action

    const newRecosNb = data ? data.length : 0
    const pathnameWithoutTrailingSlash = document.location.pathname.replace(
      /\/$/,
      ''
    )
    const weAreNotViewingACard =
      pathnameWithoutTrailingSlash === '/decouverte' ||
      pathnameWithoutTrailingSlash === '/decouverte/tuto/fin'

    const atWorldsEnd = newRecosNb === 0
    const isEmpty = (!recommendations || !recommendations.length) && atWorldsEnd
    this.setState({
      atWorldsEnd,
      isEmpty,
      isLoading: false,
    })

    dispatch(assignData({ readRecommendations: [] }))

    const shouldReloadPage = newRecosNb > 0 && weAreNotViewingACard
    if (!shouldReloadPage) return
    showFirstRecommendation(data, history)
  }

  handleDataRequest = () => {
    const { dispatch, match, recommendations, readRecommendations } = this.props

    const { atWorldsEnd, isLoading } = this.state

    if (atWorldsEnd || isLoading) return

    this.setState({ isLoading: true })
    // recupere les arguments depuis l'URL
    // l'API renvoi cette première carte avant les autres recommendations

    const queryString = getQueryParams(match, readRecommendations)
    const apiPath = `/recommendations?${queryString}`

    dispatch(
      requestData({
        apiPath,
        body: {
          readRecommendations,
          seenRecommendationIds:
            recommendations && recommendations.map(r => r.id),
        },
        handleFail: this.handleRequestFail,
        handleSuccess: this.handleRequestSuccess,
        method: 'PUT',
        normalizer: recommendationNormalizer,
      })
    )
  }

  render() {
    const { match } = this.props
    const { hasError, isEmpty, isLoading } = this.state

    const withBackButton = shouldShowVerso(match)

    return (
      <Fragment>
        <main
          role="main"
          className="discovery-page no-padding page with-footer"
        >
          {withBackButton && <BackButton />}
          {!isEmpty && (
            <Fragment>
              <Route
                key="route-discovery-booking"
                path="/decouverte/:offerId([A-Z0-9]+)/:mediationId([A-Z0-9]+)?/:view(booking)/:bookingId?/:view(cancelled)?/:menu(menu)?"
                render={route => <BookingContainer {...route} />}
              />
              <Route
                key="route-discovery-deck"
                path="/decouverte/:offerId([A-Z0-9]+)/:mediationId([A-Z0-9]+|verso)?/:view(verso|cancelled)?/:bookingId?/:menu(menu)?"
                render={route => (
                  <DeckContainer
                    {...route}
                    handleDataRequest={this.handleDataRequest}
                  />
                )}
              />
            </Fragment>
          )}
          <Footer id="deck-footer" borderTop />
        </main>
        <Loader isEmpty={isEmpty} hasError={hasError} isLoading={isLoading} />
      </Fragment>
    )
  }
}

Discovery.defaultProps = {
  lastRequestedAt: null,
  readRecommendations: null,
  recommendations: null,
}

Discovery.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fromPassword: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  lastRequestedAt: PropTypes.number,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  readRecommendations: PropTypes.array,
  recommendations: PropTypes.array,
  shouldLoadRecommendations: PropTypes.bool.isRequired,
}

export default Discovery

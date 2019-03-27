/* eslint
  react/jsx-one-expression-per-line: 0 */
import get from 'lodash.get'
import { capitalize } from 'pass-culture-shared'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import VersoInfosWhere from './VersoInfosWhere'
import { isRecommendationFinished } from '../../../helpers'
import { selectBookables } from '../../../selectors/selectBookables'
import currentRecommendationSelector from '../../../selectors/currentRecommendation'

export class RawVersoOfferInfos extends React.PureComponent {
  renderOfferWhat() {
    const { recommendation } = this.props
    const description = get(recommendation, 'offer.eventOrThing.description')
    if (!description) return null
    return (
      <div>
        <h3>Quoi ?</h3>
        <pre className="is-raw-description">{description}</pre>
      </div>
    )
  }

  renderOfferWho() {
    const { recommendation } = this.props
    const managingOfferer = get(recommendation, 'offer.venue.managingOfferer')
    if (!managingOfferer) return null
    return (
      <div className="offerer">
        Ce livre vous est offert par {managingOfferer}.
      </div>
    )
  }

  renderEventOfferDateInfos() {
    const { bookables, maxDatesShowned } = this.props
    const sliced = bookables && bookables.slice(0, maxDatesShowned)
    const hasMoreBookables = bookables && bookables.length > maxDatesShowned
    return (
      <React.Fragment>
        {sliced &&
          sliced.map(obj => (
            <li key={obj.id}>
              {capitalize(obj.humanBeginningDate)}
              {obj.userAsAlreadyReservedThisDate && ' (réservé)'}
            </li>
          ))}
        {hasMoreBookables && (
          <li>{'Cliquez sur "j\'y vais" pour voir plus de dates.'}</li>
        )}
      </React.Fragment>
    )
  }

  renderThingOfferDateInfos() {
    const { bookables } = this.props
    const limitDatetime =
      bookables && get(bookables, '[0].bookinglimitDatetime')
    return (
      <React.Fragment>
        <li>
          Dès maintenant {limitDatetime && `et jusqu&apos;au ${limitDatetime}`}{' '}
        </li>
      </React.Fragment>
    )
  }

  renderOfferWhen() {
    // const { isFinished } = this.props
    // const { recommendation } = this.props
    // const dateInfosRenderer = (get(recommendation, 'offer.thingId')
    //   ? this.renderThingOfferDateInfos
    //   : this.renderEventOfferDateInfos
    // ).bind(this)
    return <VersoInfosWhen isFinished={isFinished} />

  renderOfferWhere() {
    const { recommendation } = this.props
    return <VersoInfosWhere recommendation={recommendation} />
  }

  render() {
    return (
      <div className="verso-info">
        {this.renderOfferWhat()}
        {this.renderOfferWhen()}
        {this.renderOfferWhere()}
      </div>
    )
  }
}

RawVersoOfferInfos.defaultProps = {
  bookables: null,
  maxDatesShowned: 7,
  recommendation: null,
}

RawVersoOfferInfos.propTypes = {
  bookables: PropTypes.array,
  isFinished: PropTypes.bool.isRequired,
  maxDatesShowned: PropTypes.number,
  recommendation: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps
  const { mediationId, offerId } = match.params
  // recuperation de la recommandation
  const recommendation = currentRecommendationSelector(
    state,
    offerId,
    mediationId
  )

  const bookables = selectBookables(state, recommendation, match)
  const isFinished = isRecommendationFinished(recommendation, offerId)
  return {
    bookables,
    isFinished,
    recommendation,
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(RawVersoOfferInfos)

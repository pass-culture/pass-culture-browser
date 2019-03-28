import React from 'react'
import get from 'lodash.get'
import PropTypes from 'prop-types'
import { capitalize } from 'pass-culture-shared'
// import { connect } from 'react-redux'

class VersoInfosWhen extends React.PureComponent {
  renderEventOfferDateInfos = () => {
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

  renderThingOfferDateInfos = () => {
    const { bookables } = this.props
    const limitDatetime =
      bookables && get(bookables, '[0].bookinglimitDatetime')
    return (
      <React.Fragment>
        <li>
          Dès maintenant 
          {' '}
          {limitDatetime && `et jusqu&apos;au ${limitDatetime}`}
          {' '}
        </li>
      </React.Fragment>
    )
  }

  render() {
    const { isFinished } = this.props
    const { recommendation } = this.props
    const dateInfosRenderer = get(recommendation, 'offer.thingId')
      ? this.renderThingOfferDateInfos
      : this.renderEventOfferDateInfos
    return (
      <div id="verso-infos-section-when">
        <h3>Quand ?</h3>
        <ul className="dates-info">
          {isFinished ? (
            <li>L&apos;offre n&apos;est plus disponible :(</li>
          ) : (
            dateInfosRenderer()
          )}
        </ul>
      </div>
    )
  }
}

VersoInfosWhen.defaultProps = {
  bookables: null,
  isFinished: false,
  maxDatesShowned: 7,
  recommendation: null,
}

VersoInfosWhen.propTypes = {
  bookables: PropTypes.array,
  isFinished: PropTypes.bool,
  maxDatesShowned: PropTypes.number,
  recommendation: PropTypes.object,
}

export default VersoInfosWhen

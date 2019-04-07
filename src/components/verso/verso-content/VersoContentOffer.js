/* eslint
  react/jsx-one-expression-per-line: 0 */
import get from 'lodash.get'
import { Icon, capitalize } from 'pass-culture-shared'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import {
  getDurationFromMinutes,
  getWhatTitleFromLabelAndIsVirtualVenue,
} from './utils'
import { navigationLink } from '../../../utils/geolocation'
import VersoActionsBar from './VersoActionsBar'

class VersoContentOffer extends React.PureComponent {
  renderOfferDetails() {
    const { recommendation } = this.props
    const description = get(recommendation, 'offer.eventOrThing.description')
    if (!description) return null
    return (
      <div>
        <h3>Et en détails ?</h3>
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
    const sliced = bookables.slice(0, maxDatesShowned)
    const hasMoreBookables = bookables.length > maxDatesShowned
    return (
      <Fragment>
        {sliced.map(obj => (
          <li key={obj.id}>
            {capitalize(obj.humanBeginningDate)}
            {obj.userAsAlreadyReservedThisDate && ' (réservé)'}
          </li>
        ))}
        {hasMoreBookables && (
          <li>{'Cliquez sur "j\'y vais" pour voir plus de dates.'}</li>
        )}
      </Fragment>
    )
  }

  renderThingOfferDateInfos() {
    const { bookables } = this.props
    const limitDatetime = get(bookables, '[0].bookinglimitDatetime')
    return (
      <Fragment>
        <li>
          Dès maintenant {limitDatetime && `et jusqu&apos;au ${limitDatetime}`}{' '}
        </li>
      </Fragment>
    )
  }

  renderOfferWhat() {
    const { recommendation } = this.props
    const offer = get(recommendation, 'offer')

    const venue = get(offer, 'venue')
    const isVirtualVenue = get(venue, 'isVirtual')

    const eventOrThing = get(offer, 'eventOrThing')
    const durationMinutes = get(eventOrThing, 'durationMinutes')
    const duration = getDurationFromMinutes(durationMinutes)

    const extraData = get(eventOrThing, 'extraData')
    const label = get(eventOrThing, 'offerType.label')
    const title = getWhatTitleFromLabelAndIsVirtualVenue(label, isVirtualVenue)

    const author = get(extraData, 'author')
    const performer = get(extraData, 'performer')
    const speaker = get(extraData, 'speaker')
    const stageDirector = get(extraData, 'stageDirector')
    const type = get(extraData, 'musicType') || get(extraData, 'showType')
    return (
      <div>
        <h3>Quoi ?</h3>
        <div>
          <span className="is-bold">{title}</span>
          {durationMinutes && <span> - Durée {duration}</span>}
        </div>
        {type && <div>Genre : {type}</div>}
        {author && <div>Auteur : {author}</div>}
        {performer && <div>Interprête : {performer}</div>}
        {speaker && <div>Intervenant : {speaker}</div>}
        {stageDirector && <div>Metteur en scène : {stageDirector}</div>}
      </div>
    )
  }

  renderOfferWhen() {
    const { isFinished } = this.props
    const { recommendation } = this.props
    const dateInfosRenderer = (get(recommendation, 'offer.thingId')
      ? this.renderThingOfferDateInfos
      : this.renderEventOfferDateInfos
    ).bind(this)
    return (
      <div>
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

  renderOfferWhere() {
    const { recommendation } = this.props
    const venue = get(recommendation, 'offer.venue')
    const distance = get(recommendation, 'distance')
    const { address, city, latitude, longitude, name, postalCode } = venue || {}

    return (
      <div>
        <h3>Où ?</h3>
        <div className="flex-columns flex-between">
          <p className="address-info">
            {name && <span className="is-block">{name}</span>}
            {address && <span className="is-block">{address}</span>}
            {postalCode && <span className="is-block">{postalCode}</span>}
            {city && <span className="is-block">{city}</span>}
          </p>
          {latitude && longitude && (
            <a className="distance" href={navigationLink(latitude, longitude)}>
              {distance}
              <Icon
                svg="ico-geoloc-solid2"
                alt="Géolocalisation dans Open Street Map"
              />
            </a>
          )}
        </div>
      </div>
    )
  }

  render() {
    const { onlineOfferUrl } = this.props
    return (
      <div className="verso-info">
        {onlineOfferUrl && <VersoActionsBar url={onlineOfferUrl} />}
        {this.renderOfferWhat()}
        {this.renderOfferDetails()}
        {this.renderOfferWhen()}
        {this.renderOfferWhere()}
      </div>
    )
  }
}

VersoContentOffer.defaultProps = {
  bookables: null,
  maxDatesShowned: 7,
  onlineOfferUrl: null,
  recommendation: null,
}

VersoContentOffer.propTypes = {
  bookables: PropTypes.array,
  isFinished: PropTypes.bool.isRequired,
  maxDatesShowned: PropTypes.number,
  onlineOfferUrl: PropTypes.string,
  recommendation: PropTypes.object,
}

export default VersoContentOffer

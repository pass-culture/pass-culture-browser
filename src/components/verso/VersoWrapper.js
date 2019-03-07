/* eslint
  react/jsx-one-expression-per-line: 0 */
import get from 'lodash.get'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Draggable from 'react-draggable'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import VersoControl from './VersoControl'
import { getPageY } from '../../helpers'
import { makeDraggable, makeUndraggable } from '../../reducers/card'
import currentRecommendationSelector from '../../selectors/currentRecommendation'
import { getHeaderColor } from '../../utils/colors'
import { ROOT_PATH } from '../../utils/config'



const toRectoDraggableBounds = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
}

export class RawVersoWrapper extends Component {
  constructor(props) {
    super(props)
    this.toucheMoveHandler = this.toucheMoveHandler.bind(this)
  }

  componentDidMount() {
    if (!this.$el) return
    const opts = { passive: true }
    this.$el.addEventListener('touchmove', this.toucheMoveHandler, opts)
  }

  componentDidUpdate(prevProps) {
    const { areDetailsVisible } = this.props
    const shouldScroll =
      !areDetailsVisible && prevProps.areDetailsVisible && this.$header.scrollTo
    if (!shouldScroll) return
    this.$header.scrollTo(0, 0)
  }

  componentWillUnmount() {
    if (!this.$el) return
    this.$el.removeEventListener('touchmove', this.toucheMoveHandler)
  }

  onStop = event => {
    const { flipHandler, height, verticalSlideRatio } = this.props
    const shiftedDistance = height - getPageY(event)

    console.log('HEIN')

    const thresholdDistance = height * verticalSlideRatio
    if (shiftedDistance > thresholdDistance) {
      console.log('OUAI')
      // DON T KNOW YET HOW TO DO OTHERWISE:
      // IF IT IS CALLED DIRECTLY
      // THEN on unmount time of the component
      // one of the drag event handler will still complain
      // to want to do a setState while the component is now
      // unmounted...
      setTimeout(() => flipHandler())
    }
  }

  toucheMoveHandler() {
    const {
      draggable,
      dispatchMakeUndraggable,
      dispatchMakeDraggable,
    } = this.props
    if (draggable && this.$el.scrollTop > 0) {
      dispatchMakeUndraggable()
    } else if (!draggable && this.$el.scrollTop <= 0) {
      dispatchMakeDraggable()
    }
  }

  render() {
    const { children, className, currentRecommendation } = this.props

    const firstThumbDominantColor = get(
      currentRecommendation,
      'firstThumbDominantColor'
    )
    const headerColor = getHeaderColor(firstThumbDominantColor)

    const { mediation, offer } = currentRecommendation || {}
    const { eventOrThing, venue } = offer || {}

    const { tutoIndex } = mediation || {}

    const contentStyle = {}
    contentStyle.backgroundImage = `url('${ROOT_PATH}/mosaic-k.png')`
    if (typeof tutoIndex === 'number') {
      contentStyle.backgroundColor = headerColor
    }

    const offerVenue = get(venue, 'name')
    const author = get(eventOrThing, 'extraData.author')
    let offerName = get(eventOrThing, 'name')
    if (author) offerName = `${offerName}, de ${author}`
    return (
      <div
        ref={$el => {
          this.$el = $el
        }}
        className={`verso-wrapper ${className || ''}`}
      >
        <div
          className="verso-header"
          style={{ backgroundColor: headerColor }}
          ref={$el => {
            this.$header = $el
          }}
        >
          <h1
            id="verso-offer-name"
            style={{ lineHeight: '2.7rem' }}
            className="fs40 is-medium is-hyphens"
          >
            {offerName}
            <Draggable
              bounds={toRectoDraggableBounds}
              onStop={() => console.log('qsdqsd')}
              axis="y"
            >
              <div className="drag" />
            </Draggable>
          </h1>
          <h2 id="verso-offer-venue" className="fs22 is-normal is-hyphens">
            {offerVenue}
          </h2>
        </div>
        {typeof tutoIndex !== 'number' && <VersoControl />}
        <div className="verso-content" style={{ ...contentStyle }}>
          {children}
        </div>
      </div>
    )
  }
}

RawVersoWrapper.defaultProps = {
  currentRecommendation: null,
}

RawVersoWrapper.propTypes = {
  areDetailsVisible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  currentRecommendation: PropTypes.object,
  dispatchMakeDraggable: PropTypes.func.isRequired,
  dispatchMakeUndraggable: PropTypes.func.isRequired,
  draggable: PropTypes.bool.isRequired,
}

export default compose(
  withRouter,
  connect(
    (state, ownProps) => {
      const { mediationId, offerId } = ownProps.match.params
      const currentRecommendation = currentRecommendationSelector(
        state,
        offerId,
        mediationId
      )
      return {
        areDetailsVisible: state.card.areDetailsVisible,
        currentRecommendation,
        draggable: state.card.draggable,
      }
    },
    {
      dispatchMakeDraggable: makeDraggable,
      dispatchMakeUndraggable: makeUndraggable,
    }
  )
)(RawVersoWrapper)

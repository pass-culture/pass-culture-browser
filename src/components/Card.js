import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Draggable from 'react-draggable'
import { Portal } from 'react-portal'

import Recto from './Recto'
import Verso from './Verso'

import selectHeaderColor from '../selectors/headerColor'

class Card extends Component {
  constructor () {
    super()
    this.state = { cursor: null,
      isRead: false,
      transform: null,
      style: null
    }
  }

  handleSetRead = props => {
    // unpack and check
    const { content,
      handleSetRead,
      item,
      readTimeout
    } = props
    const { isRead } = this.state
    if (!content || isRead) { return }
    // wait a bit to trigger the fact that we stay on the same card
    this.readTimeout = setTimeout(() => {
      // make sure we are not going to do it circularly
      this.setState({ isRead: true })
      // check that style is still current
      item === 0 && handleSetRead && handleSetRead(props)
    }, readTimeout)
  }

  // handleSetStyle = props => {
  //   // unpack and check
  //   const { deckElement,
  //     handleSetStyle,
  //     isSetRead,
  //     item,
  //     onTransitionStart,
  //     transition,
  //     transitionTimeout
  //   } = props
  //   if (!deckElement) {
  //     return
  //   }
  //   // determine style
  //   let style, transform
  //   switch (item) {
  //     case -1:
  //       style = {
  //         left: - deckElement.offsetWidth,
  //         transition: transition ||
  //           `left ${transitionTimeout}ms, transform 0s`,
  //         width: deckElement.offsetWidth
  //       }
  //       break
  //     case 0:
  //       style = {
  //         left: 0,
  //         transition: transition ||
  //           `left ${transitionTimeout}ms, transform 0s`,
  //         width: deckElement.offsetWidth
  //       }
  //       break
  //     case 1:
  //       style = {
  //         left: 2 * deckElement.offsetWidth,
  //         transition: transition ||
  //           `left ${transitionTimeout}ms, transform 0s`,
  //         width: deckElement.offsetWidth
  //       }
  //       break
  //     default:
  //       break
  //   }
  //   // check read
  //   isSetRead && item === 0 && !this.readTimeout && this.handleSetRead(props)
  //   // transition happened when the style has been already set once
  //   // and that the new style has a not none transform
  //   if (this.state.style && style.transition !== 'none') {
  //     onTransitionStart && Object.keys(style)
  //      .filter(key => !/transition(.*)/.test(key))
  //      .forEach(key => {
  //         if (style[key] !== this.state.style[key]) {
  //           onTransitionStart({ propertyName: key }, this.props)
  //         }
  //       })
  //   }
  //   // inform parent about the new current card
  //   const newState = { isRead: false,
  //     style,
  //     transform
  //   }
  //   // update
  //   this.setState(newState)
  //   // hook
  //   handleSetStyle && handleSetStyle(props, newState)
  // }

  onTransitionEnd = event => {
    const { onTransitionEnd } = this.props
    onTransitionEnd && onTransitionEnd(event, this.props)
  }

  // componentDidMount () {
  //   this.onTransitionEndListener = this.cardElement.addEventListener(
  //     'transitionend',
  //     this.onTransitionEnd
  //   )
  // }

  // componentWillMount () {
  //   this.handleSetStyle(this.props)
  // }

  // componentWillReceiveProps (nextProps, nextState) {
  //   const { cursor,
  //     deckElement,
  //     isResizing,
  //     item
  //   } = nextProps
  //   if ( (deckElement && !this.props.deckElement)
  //     || (item !== this.props.item)
  //     || (isResizing && !this.props.isResizing)
  //   ) {
  //     this.handleSetStyle(nextProps)
  //   }
  // }

  // componentWillUnmount () {
  //   this.cardElement.removeEventListener('transitionend', this.onTransitionEnd)
  //   this.readTimeout && clearTimeout(this.readTimeout)
  // }

  render () {
    const { onDrag,
      onStop
    } = this
    const { content,
      isDraggable,
      isFirst,
      isFlipping,
      isLast,
      isTransitioning,
      item,
      userMediation,
      headerColor,
    } = this.props
    const { style,
      transform
    } = this.state

    /*
    const isDraggable = item === 0 &&
      !isTransitioning &&
      !this.props.isFlipped &&
      !isFlipping
    const bounds = {}
    if (isFirst || (content && content.isFirst)) {
      bounds.right = 0
    } else if (isLast || (content && content.isLast)) {
      bounds.left = 0
    }
    */

    // console.log('RENDER: Card content', content)
    return [
      /*
      <Draggable axis='x'
        bounds={bounds}
        disabled={!isDraggable}

        position={position}
        onDrag={onDrag}
        onStop={onStop} >
      */
          <span
            key={0}
            className={classnames('card', {
              'card--current': item === 0,
              'card--draggable': isDraggable
            })}
            style={{
              transform: `translate(${((this.props.userMediation || {}).index) * 100}vw, 0)`,
            }}>
            <div className='card__container' style={{ transform }}>
              <Recto {...userMediation} />
              <div className='gradient' style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%,${headerColor} 25%,${headerColor} 100%)`,
              }} />
            </div>
          </span>
      /*
      </Draggable>
      */,
      item === 0 && content.id && (
        <Portal key={1} node={document.getElementById('deck')}>
          <Verso />
        </Portal>
      )
    ]
  }
}

Card.defaultProps = {
  isSetRead: true,
  readTimeout: 3000,
  transitionDelay: 100,
  // transitionTimeout: 250,
}

export default connect(
  state => ({
    isFlipped: state.verso.isFlipped,
    headerColor: selectHeaderColor(state),
  }))(Card)

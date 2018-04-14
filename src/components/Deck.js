import classnames from 'classnames'
import get from 'lodash.get'
import Draggable from 'react-draggable'
// TODO: set resize logic, but use https://github.com/renatorib/react-sizes instead
// import debounce from 'lodash.debounce'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import Card from './Card'
import Clue from './Clue'
import Icon from './Icon'
import UserMediationsDebug from './UserMediationsDebug'
import { flip, unFlip } from '../reducers/verso'
import selectUserMediation from '../selectors/userMediation'
import selectPreviousUserMediation from '../selectors/previousUserMediation'
import selectNextUserMediation from '../selectors/nextUserMediation'
import selectIsFlipDisabled from '../selectors/isFlipDisabled'
import { getMediation } from '../selectors/mediation'
import { getOffer } from '../selectors/offer'
import { IS_DEV, ROOT_PATH } from '../utils/config';
import { getDiscoveryPath } from '../utils/routes'

class Deck extends Component {

  handleSetStyle = () => {
    // unpack
    const { currentContent } = this
    const { headerColor, transitionTimeout } = this.props
    // style
    const buttonStyle = { transition: `opacity ${transitionTimeout}ms` }
    const previousBgStyle = Object.assign({}, this.state.bgStyle)
    const bgStyle = {
                      transition: `opacity ${transitionTimeout}ms cubic-bezier(0.0, 0.0, 0, 1.0)`,
                      background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%,${headerColor} 35%,${headerColor} 100%)`,
                      opacity: 1,
                    }
    previousBgStyle.transition = `opacity ${transitionTimeout}ms cubic-bezier(1, 0.0, 1.0, 1.0)`
    previousBgStyle.opacity = 0
    // update
    this.setState({ buttonStyle, bgStyle, previousBgStyle })
  }

  // TODO: replug the loading logic

  // handleSetCurrentContent = () => {
  //   // unpack
  //   const { items } = this
  //   const { contents, isDebug } = this.props
  //   isDebug && debug('Deck - handleSetCurrentContent')
  //   // find
  //   const currentIndex = items && items.indexOf(0)
  //   const previousContent = contents && contents[currentIndex-1]
  //   const currentContent = contents && contents[currentIndex]
  //   const nextContent = contents && contents[currentIndex + 1]
  //   this.currentContent = currentContent
  //   // add a note if currentContent came from a loading card
  //   if (this.state.currentContent && this.state.currentContent.isLoading) {
  //     currentContent.isFromLoading = true
  //   }
  //   if (previousContent) {
  //     previousContent.isFromLoading = false
  //   }
  //   if (nextContent) {
  //     nextContent.isFromLoading = false
  //   }
  //   // update
  //   this.setState({ currentContent, previousContent, nextContent })
  // }

  // handleSetStyle = () => {
  //   // unpack
  //   const { currentContent } = this
  //   const { transitionTimeout } = this.props
  //   // style
  //   const buttonStyle = { transition: `opacity ${transitionTimeout}ms` }
  //   const style = {
  //     backgroundColor: 'black',
  //     transition: `background-color ${transitionTimeout}ms`
  //   }
  //   const gradientStyle = {
  //     background: 'linear-gradient(transparent, black)',
  //     transition: `background ${transitionTimeout}ms`
  //   }
  //   if (currentContent && currentContent.backgroundColor) {
  //     const [red, green, blue] = currentContent.backgroundColor
  //     const hue = rgb_to_hsv({r: red, g: green, b: blue}).h
  //     style.backgroundColor = `hsl(${hue}, 100%, 15%)`
  //     gradientStyle.background = `linear-gradient(transparent, hsl(${hue}, 100%, 15%))`
  //   }
  //   // update
  //   this.setState({ buttonStyle, gradientStyle, style })
  // }

  // TODO: replug this.props.handleSetReadCard(card)

  // handleSetReadCard = card => {
  //   // unpack
  //   const { handleSetReadCard, isDebug } = this.props
  //   isDebug && debug('Deck - handleSetReadCard')
  //   // hook if Deck has parent manager component
  //   handleSetReadCard && handleSetReadCard(card)
  // }

  // handleSetCursorCard = cursor => {
  //   this.props.isDebug && debug('Deck - handleSetCursorCard')
  //   this.setState({ cursor, transition: 'none' })
  // }

  // onTransitionEndCard = (event, cardProps) => {
  //   // check and unpack
  //   const { transitions } = this
  //   const { handleTransitionEnd, isDebug } = this.props
  //   isDebug && debug('Deck - onTransitionEndCard')
  //   // update the transitions store
  //   if (!transitions) {
  //     warn('transitions is null while we try to update transition end...? weird')
  //     return
  //   }
  //   const newTransitions = [...transitions]
  //   const transition = newTransitions[cardProps.index]
  //   if (transition && transition[event.propertyName]) {
  //       delete transition[event.propertyName]
  //       if (Object.keys(transition).length === 0) {
  //         newTransitions[cardProps.index] = false
  //       }
  //   }
  //   this.transitions = newTransitions
  //   // check
  //   if (newTransitions.every((newTransition, index) => !newTransition)) {
  //     handleTransitionEnd && handleTransitionEnd()
  //     this.setState({ isTransitioning: false })
  //     this.transitions = null
  //   }
  // }

  // onTransitionStartCard = (event, cardProps) => {
  //   // unpack
  //   const { transitions } = this
  //   const { contents,
  //     handleTransitionStart,
  //     isDebug
  //   } = this.props
  //   isDebug && debug('Deck - onTransitionStartCard')
  //   // at the first time one of the card is transitioning
  //   // we init a new array
  //   let newTransitions
  //   if (!transitions) {
  //     newTransitions = [...new Array(contents.length)]
  //     this.setState({ isTransitioning: true })
  //     handleTransitionStart && handleTransitionStart()
  //   } else {
  //     newTransitions = [...transitions]
  //   }
  //   // for this particular card, maybe the transition
  //   // exists alreay or not
  //   if (!newTransitions[cardProps.index]) {
  //     newTransitions[cardProps.index] = { [event.propertyName]: true }
  //   } else {
  //     newTransitions[cardProps.index][event.propertyName] = true
  //   }
  //   this.transitions = newTransitions
  // }



  // componentWillReceiveProps (nextProps) {
  //   // unpack
  //   const { contents } = this.props
  //   const { isTransitioning } = this.state
  //   // look for content change
  //   if (nextProps.contents !== contents) {
  //     if (!isTransitioning) {
  //       nextProps.isDebug && debug('Deck - componentWillReceiveProps')
  //       this.handleResetItems(nextProps)
  //       // init new state
  //       // transition to 'none' helps
  //       // the card to know that they should not remount with a style transition
  //       // because they are already at the good place
  //       this.setState({ transition: 'none' })
  //     }
  //   }
  // }

  // componentDidMount () {
  //   this.handleSetCurrentContent()
  //   this.setState({ deckElement: this.element })
  //   MOBILE_OS !== 'unknow' && window.addEventListener('resize', this.onDebouncedResize)
  // }

  // componentDidUpdate (prevProps, prevState) {
  //   // unpack
  //   const { contents,
  //     isDebug,
  //     transitionTimeout
  //   } = this.props
  //   const { currentContent,
  //     transition,
  //     isResizing,
  //     items
  //   } = this.state
  //   // the deck updated because we changed the contents
  //   // so we need to wait just the refresh of the children
  //   // card to reset to false the transition
  //   if (transition === 'none') {
  //     this.setState({ transition: null })
  //   }
  //   // as the deck element has a dynamical width
  //   // we need to trigger again the set of the style
  //   // of the children when we resize the window
  //   if (isResizing && !prevState.isResizing) {
  //     this.setState({ isResizing: false })
  //   }
  //   isDebug && debug('Deck - componentDidUpdate')
  //   // adapt the items and current content
  //   if (contents !== prevProps.contents || items !== prevState.items) {
  //     if (contents && !prevProps.contents) {
  //       isDebug && debug('Deck - componentDidUpdate handleResetItems')
  //       this.handleResetItems()
  //     }
  //     isDebug && debug('Deck - componentDidUpdate handleSetCurrentContent')
  //     this.handleSetCurrentContent()
  //   }
  //   // adapt style given current content
  //   if (transitionTimeout !== prevProps.transitionTimeout ||
  //     currentContent !== prevState.currentContent) {
  //     this.handleSetStyle()
  //   }
  // }

  // componentWillUnmount () {
  //   MOBILE_OS !== 'unknow' && window.removeEventListener('resize', this.onDebouncedResize)
  // }



  goToPrev = () => {
    const { history,
      isFlipped,
      previousUserMediation
    } = this.props
    if (!previousUserMediation || isFlipped) return;
    const offer = getOffer(previousUserMediation)
    history.push(getDiscoveryPath(offer, getMediation(previousUserMediation)));
  }

  goToNext = () => {
    const { history,
      isFlipped,
      nextUserMediation
    } = this.props
    if (!nextUserMediation || isFlipped) return;
    const offer = getOffer(nextUserMediation)
    history.push(getDiscoveryPath(offer, getMediation(nextUserMediation)));
  }

  onStop = (e, data) => {
    const { flip,
      horizontalSlideRatio,
      verticalSlideRatio,
      unFlip
    } = this.props
    const deckWidth = this.$deck.offsetWidth;
    const deckHeight = this.$deck.offsetHeight;
    const index = get(this.props, 'currentUserMediation.index', 0)
    const offset = (data.x + deckWidth * index)/deckWidth
    if (offset > horizontalSlideRatio) {
      this.goToPrev();
    } else if (-offset > horizontalSlideRatio) {
      this.goToNext();
    } else if (data.y > deckHeight * verticalSlideRatio) {
      unFlip();
    } else if (data.y < -deckHeight * verticalSlideRatio) {
      flip();
    }
  }

  getDragPosition() {
    return {
      x: -1 * get(this.$deck, 'offsetWidth') * get(this.props, 'currentUserMediation.index', 0),
      y: 0,
    }
  }

  render () {
    const {
      currentUserMediation,
      nextUserMediation,
      previousUserMediation,
      flip,
      isFlipDisabled,
      isFlipped,
      unFlip,
      unFlippable,
    } = this.props
    console.log(previousUserMediation, currentUserMediation, nextUserMediation)
    return [
      <div className='deck'
        id='deck'
        key={0}
        ref={$el => (this.$deck = $el)}>
        {!unFlippable && (
          <button className={classnames('button close', {
              hidden: !isFlipped,
            })}
            onClick={unFlip} >
            <Icon svg='ico-close' />
          </button>
        )}
        <div className={classnames('loading flex items-center justify-center', {
          'shown': !currentUserMediation
        })}>
          <div>
            <Icon draggable={false} svg='ico-loading-card' />
            <div className='h2'>
              chargement des offres
            </div>
          </div>
        </div>
        <Draggable
          axis={isFlipped ? 'y' : 'exclude'}
          position={this.getDragPosition()}
          onStop={this.onStop}
          >
          <div className='cards-wrapper'>
            {
              previousUserMediation && <Card position='previous'
                userMediation={previousUserMediation} />
            }
            <Card ref={$el => this.$current = $el}
              position='current'
              userMediation={currentUserMediation} />
            {
              nextUserMediation && <Card position='next'
                userMediation={nextUserMediation} />
            }
          </div>
        </Draggable>
        <ul className={classnames({
          controls: true,
          hidden: isFlipped,
        })} style={{backgroundImage: `url('${ROOT_PATH}/mosaic-w.svg')`,}}>
          <li>
            <button className={classnames('button before', {
                hidden: !previousUserMediation,
              })}
              onClick={this.goToPrev} >
                <Icon svg='ico-prev-w-group' />
            </button>
          </li>
          <li>
            <button className={classnames('button to-recto', {
                hidden: isFlipDisabled,
              })}
              disabled={isFlipDisabled}
              onClick={flip} >
              <Icon svg='ico-slideup-w' />
            </button>
            <Clue />
          </li>
          <li>
            <button className={classnames('after button', {
                hidden: !nextUserMediation,
              })}
              onClick={this.goToNext} >
              <Icon svg='ico-next-w-group' />
            </button>
          </li>
        </ul>
      </div>,
      <UserMediationsDebug key={1} {...this.props} />
    ]
  }
}

Deck.defaultProps = {
  flipRatio: 0.25,
  horizontalSlideRatio: 0.2,
  verticalSlideRatio: 0.1,
  isDebug: false,
  readTimeout: 3000,
  resizeTimeout: 250,
  transitionTimeout: 500
}

export default compose(
  withRouter,
  connect(
    state => ({
      currentUserMediation: selectUserMediation(state),
      previousUserMediation: selectPreviousUserMediation(state),
      nextUserMediation: selectNextUserMediation(state),
      isFlipDisabled: selectIsFlipDisabled(state),
      isFlipped: state.verso.isFlipped,
      unFlippable: state.verso.unFlippable,
    }),
    { flip, unFlip }
  )
)(Deck)

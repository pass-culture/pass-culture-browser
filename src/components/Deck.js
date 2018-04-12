import classnames from 'classnames'
import get from 'lodash.get'
import Draggable from 'react-draggable'
import debounce from 'lodash.debounce'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { rgb_to_hsv } from 'colorsys'

import Card from './Card'
import Clue from './Clue'
import Icon from './Icon'
import Verso from './Verso'

import { flip, unFlip } from '../reducers/verso'
import { MOBILE_OS, ROOT_PATH } from '../utils/config';
import { debug, warn } from '../utils/logguers'

import selectUserMediation from '../selectors/userMediation'
import selectPreviousUserMediation from '../selectors/previousUserMediation'
import selectNextUserMediation from '../selectors/nextUserMediation'
import selectHeaderColor from '../selectors/headerColor'
import { getOffer } from '../selectors/offer'
import { getDiscoveryPath } from '../utils/routes'

class Deck extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = { currentContent: null,
  //     cursor: 0,
  //     deckElement: null,
  //     transition: null,
  //     isFirstCard: false,
  //     isFlipping: false,
  //     isLastCard: false,
  //     isResizing: false,
  //     isTransitioning: false,
  //     items: null
  //   }
  //   this.onDebouncedResize = debounce(this.onResize, props.resizeTimeout)
  // }


  // TODO: replug this.props.handleNextItemCard(diffIndex, this)

  // handleNextItemCard = diffIndex => {
  //   // unpack
  //   const { handleNextItemCard, isDebug } = this.props
  //   const { items } = this.state
  //   if (!items) {
  //     warn('items is not defined')
  //     return
  //   }
  //   isDebug && debug('Deck - handleNextItemCard')
  //   // new state
  //   this.items = items.map(index => index + diffIndex)
  //   const newState = { cursor: 0,
  //     items: this.items
  //   }
  //   // update by shifting the items
  //   this.setState(newState)
  //   // hook if Deck has parent manager component
  //   handleNextItemCard && handleNextItemCard(diffIndex, this)
  // }

  // handleRelaxItemCard = data => {
  //   this.props.isDebug && debug('Deck - handleResetItemCard')
  //   this.setState({ cursor: 0 })
  // }

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

  // handleResetItems = (config = {}) => {
  //   // unpack
  //   const { isDebug } = this.props
  //   const contents = config.contents || this.props.contents
  //   const currentIndex = config.currentIndex || this.props.currentIndex
  //   if (!contents) {
  //     return
  //   }
  //   isDebug && debug(`Deck - handleResetItems currentIndex=${currentIndex}`)
  //   // we need to determine the dynamic mapping of the deck
  //   const items = [...Array(contents.length).keys()]
  //     .map(index => index - (currentIndex > -1 ? currentIndex : 0))
  //   this.items = items
  //   // update
  //   this.setState({ items })
  // }

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

  //
  // NEXT TRANSITION HANDLING
  //

  // onSlide = (event, diffIndex) => {
  //   this.props.isDebug && debug('Deck - onSlide')
  //   event.preventDefault()
  //   event.stopPropagation()
  //   this.handleNextItemCard(diffIndex)
  // }

  // onResize = event => {
  //   this.props.isDebug && debug('Deck - onResize')
  //   this.setState({ isResizing: true })
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

  // //
  // // VERTICAL DRAG HANDLING
  // //
  // onVerticalStart = (event, data) => {
  //   this.props.isDebug && debug('Deck - onStart')
  //   this.setState({ isFlipping: true, clientY: event.clientY })
  // }

  // onVerticalDrag = (event, data) => {
  //   // unpack
  //   const { flipRatio, isDebug } = this.props
  //   const { deckElement } = this.state
  //   isDebug && debug('Deck - onDrag')
  //   // cursor
  //   const cursor = (event.clientY - this.state.clientY) / deckElement.offsetHeight
  //   if (!this.props.isFlipped && cursor < -flipRatio) {
  //     this.props.flip()
  //   } else if (this.props.isFlipped && cursor > flipRatio) {
  //     this.props.unFlip()
  //   }
  // }

  // onVerticalStop = (event, data) => {
  //   this.props.isDebug && debug('Deck - onStop')
  //   this.setState({ isFlipping: false, y: null })
  // }

  // componentWillMount() {
  //   this.handleResetItems(this.props)
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
    if (!this.props.previousUserMediation) return;
    console.log(this.props.previousUserMediation)
    const offer = getOffer(this.props.previousUserMediation)
    this.props.history.push(getDiscoveryPath(offer, this.props.previousUserMediation));
  }

  goToNext = () => {
    if (!this.props.nextUserMediation) return;
    console.log(this.props.nextUserMediation)
    const offer = getOffer(this.props.nextUserMediation)
    this.props.history.push(getDiscoveryPath(offer, this.props.nextUserMediation));
  }


  onStop = (e, data) => {
    const deckWidth = this.$deck.offsetWidth;
    const deckHeight = this.$deck.offsetHeight;
    console.log('go to prev?', (data.x % deckWidth)/deckWidth);
    if (!this.props.isFlipped && this.props.previousUserMediation && (data.x % deckWidth)/deckWidth > (this.props.horizontalSlideRatio)) {
      this.goToPrev();
    } else if (!this.props.isFlipped && this.props.nextUserMediation && (data.x % deckWidth)/deckWidth < -this.props.horizontalSlideRatio) {
      this.goToNext();
    } else if (data.y > deckHeight * this.props.verticalSlideRatio) {
      this.props.unFlip();
    } else if (data.y < -deckHeight * this.props.verticalSlideRatio) {
      this.props.flip();
    }
  }

  render () {
    // const {
    //   handleNextItemCard,
    //   handleRelaxItemCard,
    //   handleSetCursorCard,
    //   handleSetStyleCard,
    //   handleSetReadCard,
    //   onHorizontalDrag,
    //   onHorizontalStop,
    //   onSlide,
    //   onTransitionEndCard,
    //   onTransitionStartCard,
    //   onVerticalDrag,
    //   onVerticalStart,
    //   onVerticalStop
    // } = this
    const { children,
      contents,
      extraContents,
      isLoadingBefore,
      isLoadingAfter,
      transitionTimeout,
      readTimeout,
      headerColor,
      currentUserMediation,
      nextUserMediation,
      previousUserMediation,
      isFlipDisabled,
    } = this.props
    // const { buttonStyle,
    //   currentContent,
    //   cursor,
    //   deckElement,
    //   isFirstCard,
    //   isFlipping,
    //   isLastCard,
    //   isResizing,
    //   isTransitioning,
    //   items,
    //   //nextContent,
    //   previousContent,
    //   style,
    //   transition
    // } = this.state
    // const isAfterDisabled = !items || isLastCard
    // const isAfterHidden = previousContent && previousContent.isLast
    // const isBeforeDisabled = !items || isFirstCard
    // const isBeforeHidden = currentContent && currentContent.isFirst
    // const isLoading = isLoadingBefore || isLoadingAfter
    // const isFlipDisabled = !items || isLoading ||
    //   (currentContent && currentContent.mediation &&
    //     currentContent.userMediationOffers.length === 0 &&
    //     currentContent.mediation.thumbCount === 1)
    return (
      <div className='deck'
        id='deck'
        ref={$el => (this.$deck = $el)}>
        {!this.props.unFlippable && (
          <button className={classnames('button close', {
              'hidden': !this.props.isFlipped,
            })}
            onClick={e => this.props.unFlip()} >
            <Icon svg='ico-close' />
          </button>
        )}
        <Draggable
          axis='x'
          disabled={this.props.isFlipped}
          position={{x: -1 * get(this.$deck, 'offsetWidth') * get(currentUserMediation, 'index', 0), y: 0}}
          onStop={this.onStop}
          >
          <div className='cards-wrapper'>
            {previousUserMediation && <Card position='previous' userMediation={previousUserMediation} />}
            <Card ref={$el => this.$current = $el} position='current' userMediation={currentUserMediation} />
            {nextUserMediation && <Card position='next' userMediation={nextUserMediation} />}
            <Verso />
          </div>
        </Draggable>
        <div className='board-wrapper'>
          <div className='board'
            id='deck__board'
            ref={element => this.boardElement = element}
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%,${headerColor} 35%,${headerColor} 100%)`,
            }} >
            <ul className='controls' style={{backgroundImage: `url('${ROOT_PATH}/mosaic-w.svg')`,}}>
              <li>
                <button className={classnames({
                    button: true,
                    before: true,
                    hidden: !previousUserMediation,
                  })}
                  onClick={this.goToPrev} >
                    <Icon svg='ico-prev-w-group' />
                </button>
              </li>
              <li>
                <button className={classnames({
                    button: true,
                    'to-recto': true,
                    disabled: isFlipDisabled,
                  })}
                  onClick={e => this.props.flip()} >
                  <Icon svg='ico-slideup-w' />
                </button>
                <Clue />
              </li>
              <li>
                <button className={classnames({
                    button: true,
                    after: true,
                    hidden: !nextUserMediation,
                  })}
                  onClick={this.goToNext} >
                  <Icon svg='ico-next-w-group' />
                </button>
              </li>
            </ul>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

Deck.defaultProps = { deckKey: 0,
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
    loopLength: state.data.userMediations && state.data.userMediations.length,
    currentUserMediation: selectUserMediation(state),
    previousUserMediation: selectPreviousUserMediation(state),
    nextUserMediation: selectNextUserMediation(state),
    headerColor: selectHeaderColor(state),
    isFlipped: state.verso.isFlipped,
    unFlippable: state.verso.unFlippable,
    }),
    { flip, unFlip }
  )
)(Deck)

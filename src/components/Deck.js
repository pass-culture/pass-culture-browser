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
import { flip, unFlip } from '../reducers/verso'
import selectIsFlipDisabled from '../selectors/isFlipDisabled'
import { getMediation } from '../selectors/mediation'
import selectNextLimit from '../selectors/nextLimit'
import selectNextUserMediation from '../selectors/nextUserMediation'
import selectPreviousLimit from '../selectors/previousLimit'
import selectPreviousUserMediation from '../selectors/previousUserMediation'
import { getOffer } from '../selectors/offer'
import selectUserMediation from '../selectors/userMediation'
import { IS_DEV, MOBILE_OS, ROOT_PATH } from '../utils/config';
import { getDiscoveryPath } from '../utils/routes'
import { worker } from '../workers/dexie/register'

class Deck extends Component {
  constructor () {
    super()
    this.state = { refreshKey: 0 }
  }

  handleSetStyle = () => {
    // unpack
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

  handleDeprecatedData = () => {

  }


  refreshPrevious = () => {
    const { currentUserMediation, previousLimit } = this.props
    if (currentUserMediation.index <= previousLimit) {
      worker.postMessage({ key: 'dexie-push-pull',
        state: { around: currentUserMediation.id }})
    }
  }

  refreshNext = () => {
    const { currentUserMediation, nextLimit } = this.props
    if (currentUserMediation.index >= nextLimit) {
      worker.postMessage({ key: 'dexie-push-pull',
        state: { around: currentUserMediation.id }})
    }
  }

  goToPrevious = () => {
    const { history,
      isFlipped,
      previousUserMediation
    } = this.props
    if (!previousUserMediation || isFlipped) return;
    const offer = getOffer(previousUserMediation)
    history.push(getDiscoveryPath(offer, getMediation(previousUserMediation)));
    this.refreshPrevious()
  }

  goToNext = () => {
    const { history,
      isFlipped,
      nextUserMediation
    } = this.props
    if (!nextUserMediation || isFlipped) return;
    const offer = getOffer(nextUserMediation)
    history.push(getDiscoveryPath(offer, getMediation(nextUserMediation)));
    this.refreshNext()
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
      this.goToPrevious();
    } else if (-offset > horizontalSlideRatio) {
      this.goToNext();
    } else if (data.y > deckHeight * verticalSlideRatio) {
      unFlip();
    } else if (data.y < -deckHeight * verticalSlideRatio) {
      flip();
    }
  }

  handleRefresh = nextProps => {
    // REFRESH HANDLING
    // (ie kill the transition the short time we change the blob)
    // WE CHANGE THE KEY OF THE DRAGGABLE
    // TO FORCE IT TO REMOUNT AGAIN
    const {
      currentUserMediation,
      userMediations
    } = nextProps
    if (
      (userMediations && this.props.userMediations)
      && (userMediations !== this.props.userMediations)
      && (currentUserMediation && this.props.currentUserMediation)
      && (currentUserMediation.index !== this.props.currentUserMediation.index)
    ) {
      this.setState({ refreshKey: this.state.refreshKey + 1 })
    }
  }

  handleDeprecation = nextProps => {
    // DEPRECATION HANDLING
    // IF THE RECO ARE DEPRECATED, WE GO TO DECOUVERTE
    const {
      deprecatedUserMediations,
      userMediations
    } = nextProps
    if (deprecatedUserMediations
      && deprecatedUserMediations !== this.props.deprecatedUserMediations) {
      nextProps.history.push('/decouverte')
    }
  }

  componentWillReceiveProps (nextProps) {
    this.handleRefresh(nextProps)
    this.handleDeprecation(nextProps)
  }

  getDragPosition() {
    const offsetWidth = get(this.$deck, 'offsetWidth')
    const index = get(this.props, 'currentUserMediation.index', 0)
    const x = -1 * offsetWidth * index
    return { x, y: 0 }
  }

  render () {
    const {
      currentUserMediation,
      flip,
      isFlipDisabled,
      isFlipped,
      nextUserMediation,
      previousUserMediation,
      unFlip,
      unFlippable,
    } = this.props
    const { refreshKey } = this.state
    console.log(previousUserMediation, currentUserMediation, nextUserMediation)
    console.log('unFlippable', unFlippable, 'isFlipped', isFlipped, 'isFlipDisabled', isFlipDisabled)
    return (
      <div className='deck'
        id='deck'
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
          key={refreshKey}
          position={this.getDragPosition()}
          onStop={this.onStop}
          >
          <div>
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
              onClick={this.goToPrevious} >
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
        {
          IS_DEV && (
            <div className='debug absolute left-0 ml2 p2'>
              ({this.props.isLoadingBefore ? '?' : ' '}{this.props.previousLimit}) {this.props.currentUserMediation && this.props.currentUserMediation.index}{' '}
              ({this.props.nextLimit} {this.props.isLoadingAfter ? '?' : ' '}) / {this.props.userMediations && this.props.userMediations.length - 1}
            </div>
          )
        }
      </div>
    )
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
      deprecatedUserMediations: state.data.deprecatedUserMediations,
      isFlipDisabled: selectIsFlipDisabled(state),
      isFlipped: state.verso.isFlipped,
      nextLimit: selectNextLimit(state),
      nextUserMediation: selectNextUserMediation(state),
      previousLimit: selectPreviousLimit(state),
      previousUserMediation: selectPreviousUserMediation(state),
      userMediations: state.data.userMediations,
      unFlippable: state.verso.unFlippable,
    }),
    { flip, unFlip }
  )
)(Deck)

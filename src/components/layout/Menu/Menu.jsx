import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import { Transition } from 'react-transition-group'
import User from '../../pages/profile/ValueObjects/User'
import CloseLink from '../Header/CloseLink/CloseLink'
import Header from './Header/Header'
import MenuItemContainer from './MenuItem/MenuItemContainer'
import getMenuItems from './utils/getMenuItems'

class Menu extends PureComponent {
  componentDidMount() {
    const { toggleOverlay } = this.props
    toggleOverlay()
  }

  componentWillUnmount() {
    const { toggleOverlay } = this.props
    toggleOverlay()
  }

  urlWithoutMenuElement = history => () => history.location.pathname.replace('/menu', '')

  render() {
    const { currentUser, history } = this.props

    return (
      <Transition
        appear
        in
        timeout={250}
      >
        {status => (
          <div
            className={`is-overlay ${status}`}
            id="main-menu"
          >
            <div className="inner is-full-layout is-relative flex-rows flex-end">
              <div
                className="pc-theme-red is-relative pc-scroll-container"
                id="main-menu-fixed-container"
              >
                <CloseLink
                  closeTitle="Fermer la navigation"
                  closeTo={this.urlWithoutMenuElement(history)()}
                />
                <Header currentUser={currentUser} />
                <nav
                  className="flex-rows pb0"
                  id="main-menu-navigation"
                >
                  {getMenuItems.map(menuItem => (
                    <MenuItemContainer
                      item={menuItem}
                      key={menuItem.href || menuItem.path}
                    />
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </Transition>
    )
  }
}

Menu.defaultProps = {
  currentUser: null,
}

Menu.propTypes = {
  currentUser: PropTypes.instanceOf(User),
  history: PropTypes.shape().isRequired,
  toggleOverlay: PropTypes.func.isRequired,
}

export default Menu

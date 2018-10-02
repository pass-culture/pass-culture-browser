import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleMainMenu } from '../../reducers/menu'

const NavigationFooter = ({ className, disabled, dispatch, theme }) => (
  <footer
    className={`pc-theme-${theme} pc-footer flex-center flex-none fs22 ${className}`}
  >
    <button
      type="button"
      disabled={disabled}
      id="open-menu-button"
      onClick={() => dispatch(toggleMainMenu())}
      className="no-border no-background no-outline no-select"
    >
      <span
        aria-hidden
        className="icon-ico-user-circled"
        title="Afficher le menu de navigation"
      />
    </button>
  </footer>
)

NavigationFooter.defaultProps = {
  className: '',
  disabled: false,
}

NavigationFooter.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
}

export default connect()(NavigationFooter)

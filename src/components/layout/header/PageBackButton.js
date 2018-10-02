import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const PageBackButton = ({ className, disabled, history, theme }) => (
  <span
    style={{ left: 0 }}
    className={`pc-theme-${theme} is-absolute ml12 ${className}`}
  >
    <button
      type="button"
      disabled={disabled}
      id="history-back-button"
      onClick={history.goBack}
      className="no-border no-background no-outline"
    >
      <span
        aria-hidden
        className="pc-icon icon-ico-prev-s"
        title="Revenir à la page précédente"
      />
    </button>
  </span>
)

PageBackButton.defaultProps = {
  className: '',
  disabled: false,
  theme: 'red',
}

PageBackButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  history: PropTypes.object.isRequired,
  theme: PropTypes.string,
}

export default withRouter(PageBackButton)

import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const HistoryCloseButton = ({ className, history, theme }) => (
  <span
    style={{ right: 0 }}
    className={`pc-theme-${theme} is-absolute mr12 ${className}`}
  >
    <button
      type="button"
      id="history-back-button"
      onClick={history.goBack}
      className="no-border no-background no-outline"
    >
      <span aria-hidden className="icon-close" title="" />
    </button>
  </span>
)

HistoryCloseButton.defaultProps = {
  className: '',
  theme: 'red',
}

HistoryCloseButton.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object.isRequired,
  theme: PropTypes.string,
}

export default withRouter(HistoryCloseButton)

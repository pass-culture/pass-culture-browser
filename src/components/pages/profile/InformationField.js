/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'

const InformationInput = ({ label, value, placeholder }) => (
  <div className="flex-columns dotted-bottom-black pt20 pb22">
    <div className="flex-1">
      <span className="is-block is-uppercase">{label}</span>
      {value && <span className="is-block is-uppercase">{value}</span>}
      {!value && <span className="is-block is-uppercase">{placeholder}</span>}
    </div>
    <button type="button" className="no-border no-background">
      <span aria-hidden className="icon-next" title={`Modifier ${label}`} />
    </button>
  </div>
)

InformationInput.defaultProps = {
  placeholder: 'Non renseigné',
}

InformationInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
}

export default InformationInput

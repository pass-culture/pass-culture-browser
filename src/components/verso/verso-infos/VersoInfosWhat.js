import React from 'react'
import PropTypes from 'prop-types'

const VersoInfosWhat = ({ description }) => (
  <div id="verso-infos-section-what">
    <h3>Quoi ?</h3>
    <pre className="is-raw-description">{description}</pre>
  </div>
)

VersoInfosWhat.defaultProps = {
  description: null,
}

VersoInfosWhat.propTypes = {
  description: PropTypes.string,
}

export default VersoInfosWhat

/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'

const MonPassCulture = ({ provider }) => {
  console.log('provider', provider)
  const { expenses } = provider
  console.log('expenses', expenses)
  return (
    <div>
      <h3 className="dotted-bottom-primary is-primary-text is-uppercase pb8 px12">
        <i>Mon PassCulture</i>
      </h3>
      <div className="flex-columns flex-center wrap-2">
        <div className="col1of2" />
        <div className="col1of2" />
      </div>
    </div>
  )
}
MonPassCulture.defaultProps = {}
MonPassCulture.propTypes = {
  provider: PropTypes.object.isRequired,
}
export default MonPassCulture

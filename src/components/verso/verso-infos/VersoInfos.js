/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'

import VersoInfosWhat from './VersoInfosWhat'
import VersoInfosWhen from './VersoInfosWhen'
import VersoInfosWhere from './VersoInfosWhere'

export const VersoInfos = ({ bookables, isFinished, recommendation }) => {
  if (!recommendation) return null
  return (
    <div className="verso-info">
      <VersoInfosWhat recommendation={recommendation} />
      <VersoInfosWhen
        bookables={bookables}
        isFinished={isFinished}
        recommendation={recommendation}
      />
      <VersoInfosWhere recommendation={recommendation} />
    </div>
  )
}

VersoInfos.defaultProps = {
  bookables: null,
  recommendation: null,
}

VersoInfos.propTypes = {
  bookables: PropTypes.array,
  isFinished: PropTypes.bool.isRequired,
  recommendation: PropTypes.object,
}

export default VersoInfos

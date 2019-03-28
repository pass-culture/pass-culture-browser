/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'

import VersoInfosWhat from './VersoInfosWhat'
import VersoInfosWhen from './VersoInfosWhen'
import VersoInfosWhere from './VersoInfosWhere'

export const VersoInfos = ({
  bookables,
  description,
  distance,
  isFinished,
  recommendation,
  venue,
}) => {
  if (!recommendation) return null
  return (
    <div className="verso-info">
      <VersoInfosWhat description={description} />
      <VersoInfosWhen
        bookables={bookables}
        isFinished={isFinished}
        recommendation={recommendation}
      />
      <VersoInfosWhere venue={venue} distance={distance} />
    </div>
  )
}

VersoInfos.defaultProps = {
  bookables: null,
  description: null,
  distance: null,
  recommendation: null,
  venue: null,
}

VersoInfos.propTypes = {
  bookables: PropTypes.array,
  description: PropTypes.string,
  distance: PropTypes.string,
  isFinished: PropTypes.bool.isRequired,
  recommendation: PropTypes.object,
  venue: PropTypes.object,
}

export default VersoInfos

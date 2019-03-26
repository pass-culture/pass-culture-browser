import PropTypes from 'prop-types'
import React from 'react'

import { THUMBS_URL } from '../../utils/config'

const VersoStaticCard = ({ mediationId }) => (
  <img
    alt="verso"
    className="verso-tuto-mediation"
    src={`${THUMBS_URL}/mediations/${mediationId}_1`}
  />
)

VersoStaticCard.propTypes = {
  mediationId: PropTypes.string.isRequired,
}

export default VersoStaticCard

import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import Thumb from './Thumb'
import { IS_DEV } from '../../../utils/config'

const Recto = ({ areDetailsVisible, extraClassName, recommendation }) => {
  const { dateRead, id, index, isClicked, mediation, offer, thumbUrl } = recommendation || {}
  const { id: offerId } = offer || {}
  const { frontText } = mediation || {}
  const withMediation = typeof mediation !== 'undefined'

  return (
    <div className={classnames('recto', extraClassName)}>
      {thumbUrl && (
        <Thumb
          src={thumbUrl}
          translated={areDetailsVisible}
          withMediation={withMediation}
        />
      )}
      {frontText && <div className="mediation-front-text fs20">{frontText}</div>}
      {IS_DEV && (
        <div className="debug debug-recto">
          <div>
            {id} {offerId} {index}
          </div>
          {dateRead && <div> {'déjà lue'} </div>}
          {isClicked && <div> {'déjà retournée'} </div>}
        </div>
      )}
    </div>
  )
}

Recto.defaultProps = {
  extraClassName: null,
  recommendation: null,
}

Recto.propTypes = {
  areDetailsVisible: PropTypes.bool.isRequired,
  extraClassName: PropTypes.string,
  recommendation: PropTypes.shape(),
}

export default Recto

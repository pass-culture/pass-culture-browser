import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
/** @jsx jsx */
import {  jsx, css  } from '@emotion/core'
import Icon from '../../Icon/Icon'

const BackLink = ({ actionOnClick, backTitle, backTo }) => {
  return (
    <Link
      css={backLinkStyle}
      onClick={actionOnClick}
      to={backTo}
    >
      <Icon
        alt={backTitle}
        css={iconStyle}
        svg="ico-back"
      />
    </Link>
  )
}

BackLink.defaultProps = {
  actionOnClick: null,
  backTitle: 'Retour',
}

BackLink.propTypes = {
  actionOnClick: PropTypes.func,
  backTitle: PropTypes.string,
  backTo: PropTypes.string.isRequired,
}

const row = '1/2'
const backLinkStyle = {
  gridRow: row ,
  gridColumn: row,
  placeSelf: 'center',
}

const iconStyle = {
  height:' 21px',
  width: '21px',
}



export default BackLink

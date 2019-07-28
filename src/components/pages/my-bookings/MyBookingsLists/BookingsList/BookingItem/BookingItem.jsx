import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

import Icon from '../../../../../layout/Icon'
import Ribbon from '../../../../../layout/Ribbon'

const MyBooking = ({ detailsUrl, isCancelled, productName, stringifyDate, thumbUrl, token }) => (
  <li
    className="my-bookings-my-booking"
    data-token={token}
  >
    <Link
      className="my-bookings-link"
      to={detailsUrl}
    >
      <div className="my-bookings-thumb">{thumbUrl && <img
        alt=""
        src={thumbUrl}
                                                      />}
      </div>
      <div className="my-bookings-infos">
        <div className="my-bookings-heading">
          <div className="my-bookings-title">{productName}</div>
          <div className="my-bookings-date">{stringifyDate}</div>
        </div>
        <div className="my-bookings-token">{token}</div>
      </div>
      <div className="my-bookings-arrow">
        {isCancelled && <Ribbon />}
        <Icon
          className="my-bookings-arrow-img"
          svg="ico-next-S"
        />
      </div>
    </Link>
  </li>
)

MyBooking.defaultProps = {
  isCancelled: false,
  stringifyDate: 'Permanent',
  thumbUrl: null,
}

MyBooking.propTypes = {
  detailsUrl: PropTypes.string.isRequired,
  isCancelled: PropTypes.bool,
  productName: PropTypes.string.isRequired,
  stringifyDate: PropTypes.string,
  thumbUrl: PropTypes.string,
  token: PropTypes.string.isRequired,
}

export default MyBooking

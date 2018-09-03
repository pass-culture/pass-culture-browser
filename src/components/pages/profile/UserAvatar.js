import React from 'react'
import PropTypes from 'prop-types'

import ProfilePicture from '../../layout/ProfilePicture'

const noop = () => {}

const UserAvatar = ({ provider }) => (
  <div className="padded flex-columns my22">
    <span className="flex-1">
      <ProfilePicture colored style={{ height: 80, width: 80 }} />
      {provider &&
        provider.thumb && <img alt="Mon Avatar" src={provider.thumb} />}
      <b className="ml12" style={{ fontSize: '1.2rem' }}>
        {provider.publicName}
      </b>
    </span>
    <button
      disabled
      type="button"
      onClick={noop}
      className="no-border no-baackground flex-0"
    >
      <span
        aria-hidden
        className="icon-next"
        title="Modifier Mes Notifications"
      />
    </button>
  </div>
)

UserAvatar.defaultProps = {}

UserAvatar.propTypes = {
  provider: PropTypes.object.isRequired,
}

export default UserAvatar

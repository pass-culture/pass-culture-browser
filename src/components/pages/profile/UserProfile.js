import React from 'react'
import PropTypes from 'prop-types'

import ProfilePicture from '../../layout/ProfilePicture'

const noop = () => {}

const UserProfile = ({ provider }) => (
  <div className="padded flex-columns my22">
    <span className="flex-1">
      <ProfilePicture colored style={{ height: 80, width: 80 }} />
      {provider &&
        provider.thumb && <img alt="Mon Avatar" src={provider.thumb} />}
    </span>
    <button
      type="button"
      onClick={noop}
      className="no-border no-baackground  flex-0 no-pointer"
    >
      <span
        aria-hidden
        className="icon-next"
        title="Modifier Mes Notifications"
      />
    </button>
  </div>
)

UserProfile.defaultProps = {}

UserProfile.propTypes = {
  provider: PropTypes.object.isRequired,
}

export default UserProfile

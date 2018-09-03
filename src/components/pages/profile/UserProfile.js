import React from 'react'
// import PropTypes from 'prop-types'

import ProfilePicture from '../../layout/ProfilePicture'

const UserProfile = () => (
  <div className="flex-columns">
    <span>
      <ProfilePicture colored />
    </span>
    <span className="is-block flex-0">
      <span
        aria-hidden
        className="icon-next"
        title="Modifier Mes Notifications"
      />
    </span>
  </div>
)

UserProfile.defaultProps = {}

UserProfile.propTypes = {
  // provider: PropTypes.object.isRequired,
}

export default UserProfile

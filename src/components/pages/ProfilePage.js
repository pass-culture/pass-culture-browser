/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import { withLogin } from 'pass-culture-shared'

import { ROOT_PATH } from '../../utils/config'
import Loader from '../Loader'
import UserAvatar from './profile/UserAvatar'
import MonPassCulture from './profile/MonPassCulture'
import MesInformations from './profile/MesInformations'
import NavigationFooter from '../layout/NavigationFooter'

const ProfilePage = ({ user }) => {
  const isloaded = user || typeof user === 'object'
  const backgroundImage = `url('${ROOT_PATH}/mosaic-k@2x.png')`
  return (
    <div id="profile-page" className="page is-relative flex-rows">
      {isloaded && (
        <React.Fragment>
          <header className="padded pc-primary-element text-center flex-0">
            <h1>
              <span>Mon profil</span>
            </h1>
          </header>
          <main role="main" className="is-relative flex-1">
            <Scrollbars autoHide>
              <div style={{ backgroundImage }}>
                <UserAvatar provider={user} />
                <MonPassCulture provider={user} />
              </div>
              <MesInformations provider={user} />
            </Scrollbars>
          </main>
          <NavigationFooter className="pc-white-element dotted-top-primary" />
        </React.Fragment>
      )}
      <Loader isloading={!isloaded} />
    </div>
  )
}

ProfilePage.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
}

const mapStateToProps = state => {
  const user = state.user || false
  return { user }
}

export default compose(
  withLogin({ failRedirect: '/connexion' }),
  connect(mapStateToProps)
)(ProfilePage)

/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { requestData, withLogin } from 'pass-culture-shared'

import UserProfile from './profile/UserProfile'
import MonPassCulture from './profile/MonPassCulture'
import MesInformations from './profile/MesInformations'
import NavigationFooter from '../layout/NavigationFooter'

class ProfilePage extends React.PureComponent {
  constructor(props) {
    super(props)
    const { dispatch } = props
    const actions = { requestData }
    this.actions = bindActionCreators(actions, dispatch)
  }

  render() {
    const { user } = this.props
    const isloaded = user || typeof user === 'object'
    if (!isloaded) {
      return (
        // FIXME
        <div id="profile-page" className="page flex-rows">
          is loading
        </div>
      )
    }
    return (
      <div id="profile-page" className="page flex-rows">
        <header className="padded pc-primary-element text-center flex-0">
          <h1>
            <span>Mon profil</span>
          </h1>
        </header>
        <main role="main" className="is-relative flex-1">
          <UserProfile provider={user} />
          <MonPassCulture provider={user} />
          <MesInformations provider={user} />
        </main>
        <NavigationFooter className="pc-white-element dotted-top-primary" />
      </div>
    )
  }
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
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

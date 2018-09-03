/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { requestData, withLogin } from 'pass-culture-shared'

import NavigationFooter from '../layout/NavigationFooter'
import InformationInput from './profile/InformationField'

class ProfilePage extends React.PureComponent {
  constructor(props) {
    super(props)
    const { dispatch } = props
    const actions = { requestData }
    this.actions = bindActionCreators(actions, dispatch)
  }

  render() {
    const { user } = this.props
    console.log('user', user)
    return (
      <div id="profile-page" className="page flex-rows">
        <header className="padded background-primary text-center flex-0">
          <h1>
            <span>Mon profil</span>
          </h1>
        </header>
        <main role="main" className="is-relative flex-1">
          <div className="section">
            <h3 className="dotted-bottom-primary is-uppercase">
              <span>Mon PassCulture</span>
            </h3>
          </div>
          <div className="section">
            <h3 className="dotted-bottom-primary is-uppercase">
              <span>Mes Informations</span>
            </h3>
            <div>
              <InformationInput label="Identifiant" value="" />
              <InformationInput label="Nom et prénom" />
              <InformationInput
                label="Adresse e-mail"
                value="prenom.nom@domaine.fr"
              />
              <InformationInput label="Mot de passe" value="*****" />
              <InformationInput
                label="Département de résidence"
                value="*****"
              />
              <InformationInput
                label="Département de résidence"
                value="93 - Seine-Saint-Denis"
              />
            </div>
          </div>
        </main>
        <NavigationFooter className="flex-0" />
      </div>
      /* <Main
        name="profile"
        backButton
        footer={renderPageFooter}
        header={renderPageHeader}
      >
        <h2 className="title">
          {'Bienvenue !'}
        </h2>
        <button
          type="button"
          className="button is-default"
          disabled={!user}
          onClick={this.onSignOutClick}
        >
          {'Déconnexion'}
        </button>
      </Main> */
    )
  }
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({ user: state.user })

export default compose(
  withLogin({ failRedirect: '/connexion' }),
  connect(mapStateToProps)
)(ProfilePage)

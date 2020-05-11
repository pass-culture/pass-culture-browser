import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import PersonalInformationsField from '../forms/fields/PersonalInformationsField'
import HeaderContainer from '../../../layout/Header/HeaderContainer'

class PersonalInformations extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      nickname: props.user.publicName,
      errors: null,
    }

    this.nicknameInputRef = React.createRef()
  }

  handleNicknameChange = event => {
    const newValue = event.target.value
    this.setState({ nickname: newValue })
  }

  handleSubmitFail = (state, action) => {
    this.setState({ errors: { ...action.payload.errors } })
    this.nicknameInputRef.current.focus()
    this.nicknameInputRef.current.select()
  }

  handleSubmitSuccess = () => {
    const { history, snackbar, pathToProfile } = this.props
    this.setState({ errors: null })
    history.push(pathToProfile)
    snackbar('Ton pseudo a bien été modifié.', 'success')
  }

  handleSubmitNickname = event => {
    event.preventDefault()
    const { handleSubmit, user, pathToProfile, history } = this.props
    const nicknameInputValue = this.nicknameInputRef.current.value
    const nicknameToSubmit = {
      publicName: nicknameInputValue,
    }

    if (user.publicName !== nicknameInputValue) {
      handleSubmit(nicknameToSubmit, this.handleSubmitFail, this.handleSubmitSuccess)
    } else {
      history.push(pathToProfile)
    }
  }

  render() {
    const { user, getDepartment } = this.props
    const { errors, nickname } = this.state

    return (
      <div className="pi-container">
        <HeaderContainer
          backTo="/profil"
          closeTo={null}
          title="Informations personnelles"
        />
        <form
          className="pi-form"
          onSubmit={this.handleSubmitNickname}
        >
          <div>
            <PersonalInformationsField
              errors={errors && errors.publicName}
              label="Pseudo"
              maxLength={255}
              minLength={3}
              name="publicName"
              onChange={this.handleNicknameChange}
              ref={this.nicknameInputRef}
              required
              value={nickname}
            />
            <PersonalInformationsField
              disabled
              label="Nom et prénom"
              name="name"
              value={`${user.firstName} ${user.lastName}`}
            />
            <PersonalInformationsField
              disabled
              label="Adresse e-mail"
              name="email"
              value={user.email}
            />
            <PersonalInformationsField
              disabled
              label="Département de résidence"
              name="departementCode"
              value={getDepartment(user.departementCode)}
            />
          </div>
          <div className="pi-form-submit">
            <input
              className="button-submit"
              onClick={this.handleSubmitNickname}
              type="submit"
              value="Enregistrer"
            />
          </div>
        </form>
      </div>
    )
  }
}

PersonalInformations.propTypes = {
  getDepartment: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  pathToProfile: PropTypes.string.isRequired,
  snackbar: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]).isRequired,
}

export default PersonalInformations
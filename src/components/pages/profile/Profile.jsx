import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

import { profileInformationsFieldsConfig } from './profileInformationsFieldsConfig'
import ProfileMainView from './ProfileMainView/ProfileMainView'
import ProfileUpdateSuccess from './ProfileUpdateSuccess/ProfileUpdateSuccess'
import NotMatch from '../not-match/NotMatch'
import LoaderContainer from '../../layout/Loader/LoaderContainer'

class Profile extends PureComponent {
  parseRoutesWithComponent = () => {
    const components = profileInformationsFieldsConfig.filter(o => o.component)
    const routes = components.reduce((acc, o) => ({ ...acc, [o.routeName]: o }), {})
    return routes
  }

  renderProfileMainView = currentUser => () => (
    <ProfileMainView
      currentUser={currentUser}
      informationsFields={profileInformationsFieldsConfig}
    />
  )

  renderProfileUpdateSuccess = routes => routeProps => (
    <ProfileUpdateSuccess
      {...routeProps}
      config={routes}
    />
  )

  renderProfileEditForm = routes => routeProps => {
    const { view } = routeProps.match.params
    const Component = routes[view].component

    if (!Component) return null

    const { title } = routes[view]

    return (<Component
      {...routeProps}
      title={title}
            />)
  }

  renderNoMatch = routeProps => (<NotMatch
    {...routeProps}
    delay={3}
    redirect="/profil"
                                 />)

  render() {
    const { currentUser, location } = this.props
    const routes = this.parseRoutesWithComponent()
    const possibleRoutes = Object.keys(routes).join('|')

    return (
      <div
        className="page is-relative"
        id="profile-page"
      >
        {currentUser && (
          <Switch location={location}>
            <Route
              exact
              key="route-profile-main-view"
              path="/profil/:menu(menu)?"
              render={this.renderProfileMainView(currentUser)}
            />
            <Route
              exact
              key="route-profile-update-success"
              path={`/profil/:view(${possibleRoutes})/success/:menu(menu)?`}
              render={this.renderProfileUpdateSuccess(routes)}
            />
            <Route
              exact
              key="route-profile-edit-form"
              path={`/profil/:view(${possibleRoutes})/:menu(menu)?`}
              render={this.renderProfileEditForm(routes)}
            />
            <Route component={this.renderNoMatch} />
          </Switch>
        )}
        {!currentUser && <LoaderContainer isLoading />}
      </div>
    )
  }
}

Profile.propTypes = {
  currentUser: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
}

export default Profile

/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withLogin } from 'pass-culture-shared'
import { Route, Switch, withRouter } from 'react-router-dom'

import { getRoutesConfigObject } from './profile/config'
import NotMatch from './NotMatch'
import Loader from '../layout/Loader'
import ProfileMainView from './profile/ProfileMainView'
import ProfileUpdateSuccess from './profile/ProfileUpdateSuccess'

const ProfilePage = ({ isloaded, location, user }) => {
  const routes = getRoutesConfigObject()
  const routeNames = Object.keys(routes)
  // seules les routes dans `allowedRoutes`
  // sont autorisées à être affichées par React Router
  // les autres/ou inconnues iront dans la route NotMatch (404)
  const allowedRoutes = routeNames.join('|')
  return (
    <div id="profile-page" className="page is-relative">
      {isloaded && (
        <Switch location={location}>
          <Route
            exact
            path="/profil"
            key="route-profile-main-view"
            render={() => <ProfileMainView user={user} />}
          />
          <Route
            exact
            path={`/profil/:view(${allowedRoutes})/success`}
            key="route-profile-update-success"
            render={routeProps => {
              const { view } = routeProps.match.params
              const { title } = routes[view]
              return <ProfileUpdateSuccess title={title} />
            }}
          />
          <Route
            exact
            path={`/profil/:view(${allowedRoutes})`}
            key="route-profile-edit-form"
            render={routeProps => {
              const { view } = routeProps.match.params
              // Object provenant de la configuration
              const { FormComponent, initialValues, title } = routes[view]
              return (
                <FormComponent
                  {...routeProps}
                  user={user}
                  title={title}
                  initialValues={initialValues}
                />
              )
            }}
          />
          <Route
            component={routeProps => (
              <NotMatch {...routeProps} delay={3} redirect="/profil" />
            )}
          />
        </Switch>
      )}
      {!isloaded && <Loader isloading />}
    </div>
  )
}

ProfilePage.propTypes = {
  isloaded: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.user || false
  const isloaded = (user && user !== null) || typeof user === 'object'
  return { isloaded, user }
}

export default compose(
  withRouter,
  withLogin({ failRedirect: '/connexion' }),
  connect(mapStateToProps)
)(ProfilePage)

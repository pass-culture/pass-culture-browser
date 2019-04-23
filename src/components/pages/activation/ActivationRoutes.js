import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import ActivationError from './error/ActivationError'
import InvalidLink from './invalid-link/InvalidLink'
import ActivationTypeForm from './poc-typeform/ActivationTypeForm'
import ActivationPageContainer from './password/ActivationPageContainer'

const ActivationRoutes = () => (
  <div
    id="activation-page"
    className="is-full-layout is-relative pc-gradient is-white-text flex-rows"
  >
    <Switch>
      <Route
        path="/activation/poc-typeform"
        component={ActivationTypeForm}
        exact
      />
      <Route path="/activation/error" component={ActivationError} exact />
      <Route path="/activation/lien-invalide" component={InvalidLink} exact />
      <Route path="/activation/:token" component={ActivationPageContainer} />
      <Redirect to="/activation/error" />
    </Switch>
  </div>
)

export default ActivationRoutes

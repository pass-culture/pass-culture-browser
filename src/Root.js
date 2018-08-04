import Raven from 'raven-js'
import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter,
  matchPath,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import persistor from './utils/persistor'
import routes from './utils/routes'
import store from './utils/store'
import { API_URL, IS_DEV } from './utils/config'
import { version } from '../package.json'

const Root = () => {
  if (!IS_DEV) {
    Raven.config(`${API_URL}/client_errors`, {
      release: version,
      environment: process.env.NODE_ENV,
      logger: 'javascript',
    }).install()
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App>
            <Switch>
              {routes.map(route => (
                <Route
                  key={route.path}
                  {...route}
                  render={match => {
                    document.title = `${
                      route.title ? `${route.title} - ` : ''
                    }Pass Culture`
                    return route.render(match)
                  }}
                />
              ))}
              <Route
                path="/:active?"
                render={({ match, location }) => {
                  const matchedRoute = routes.find(route =>
                    matchPath(`/${match.params.active}`, route)
                  )
                  return (
                    location.pathname !== '/' &&
                    !matchedRoute && <Redirect to="/" />
                  )
                }}
              />
            </Switch>
          </App>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default Root

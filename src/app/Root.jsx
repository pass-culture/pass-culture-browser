import React, { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import SmartBanner from 'react-smartbanner'

import PageNotFoundContainer from '../components/layout/ErrorBoundaries/ErrorsPage/PageNotFound/PageNotFoundContainer'
import MatomoContainer from '../components/matomo/MatomoContainer'
import FeaturedRouteContainer from '../components/router/FeaturedRouteContainer'
import routes from '../components/router/routes'
import Tracking from '../components/tracking/Tracking'
import { configureStore } from '../utils/store'
import AppContainer from './App/AppContainer'

const { store, persistor } = configureStore()

const Root = () => (
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <SmartBanner
          button="Voir"
          daysHidden={1}
          position="top"
          price={{ ios: 'GRATUIT', android: 'GRATUIT' }}
          storeText={{ ios: "Sur l'App Store", android: 'Sur Google Play' }}
          title="pass Culture"
        />
        <BrowserRouter>
          <AppContainer>
            <Switch>
              {routes.map(route => (
                <FeaturedRouteContainer
                  {...route}
                  key={route.path}
                />
              ))}
              <FeaturedRouteContainer
                component={PageNotFoundContainer}
                path="*"
                title="404"
              />
            </Switch>
            <MatomoContainer />
            <Tracking />
          </AppContainer>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
)

export default Root

import {
  setGeolocationPosition,
  setGeolocationWatchId,
} from '../reducers/geolocation'
import { worker } from '../workers/dexie/register'

import { googleMapsLink } from './geolocation'

const init = store => {
  const watchId = navigator.geolocation.watchPosition((position) => {
    console.log('BEN ALORS', position, googleMapsLink(position.coords.latitude, position.coords.longitude))
    store.dispatch(setGeolocationPosition(position))
    worker.postMessage({
      key: 'dexie-state',
      state: { position },
    })
  })
  store.dispatch(setGeolocationWatchId(watchId))
}

export default init

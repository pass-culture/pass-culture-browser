import { db, pushPull } from './utils/dexie'

const state = {}
let initPort = null

async function dexiePushPull (port) {
  // pull
  await pushPull(state)
  // post
  port && port.postMessage({ text: "Hey I just got a fetch from you!" })
}

self.addEventListener('message', event => {
  const { key, type } = event.data
  if (type === 'sync') {
    // check
    if (!key) {
      console.warn('you need to define a key in event.data')
      return
    }
    // switch
    if (key === 'dexie-init') {
      initPort = event.ports[0]
      self.registration.sync.register(key)
    } else if (key === 'dexie-push-pull') {
      event.waitUntil(dexiePushPull(event.ports[0]))
    } else if (key === 'dexie-stop') {
      initPort = null
      self.registration.unregister()
    }
    // update
    event.data.state &&
      Object.keys(event.data.state).length > 0 &&
      Object.assign(state, event.data.state)
  }
})

self.addEventListener('sync', function (event) {
  if (event.tag === 'dexie-init') {
    event.waitUntil(dexiePushPull(initPort))
  }
})

import { createSelector } from 'reselect'

export default createSelector(
  state => state.router.location.pathname,
  function (pathname) {
    let [, , , eventOrThingId ] = pathname.split('/')
    return eventOrThingId
  }
)

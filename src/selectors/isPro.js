import { createSelector } from 'reselect'

export function getIsPro (user) {
  return user && user.offerers && user.offerers.length > 0
}

export default createSelector(
  state => state.user,
  getIsPro
)

import { createSelector } from 'reselect'

import selectUserMediation from './userMediation'

export default createSelector(
  state => state.data.userMediations,
  state => selectUserMediation(state),
<<<<<<< HEAD
  (userMediations, userMediation) =>
    userMediation
    && userMediations
    && userMediations[userMediations.findIndex(um =>
      um.id === userMediation.id) - 1]
=======
  (userMediations, userMediation) => {
    return userMediation && userMediations && userMediations[userMediations.findIndex(um => um.id === userMediation.id) - 1];
  }
>>>>>>> f5c0502897a0a7432f3ddbc892be2d45161d5922
)

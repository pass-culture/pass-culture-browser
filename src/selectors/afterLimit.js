import { createSelector } from 'reselect'

import { AFTER_COUNT } from './utils/deck'

export default createSelector(
  state => state.data.userMediations,
  userMediations =>
    userMediations && (
      AFTER_COUNT >= userMediations.length - 1
        ? userMediations.length
        : userMediations.length - AFTER_COUNT
    )
)

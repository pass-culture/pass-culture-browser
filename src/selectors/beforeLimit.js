import { createSelector } from 'reselect'

import { BEFORE_COUNT } from './utils/deck'

export default createSelector(
  state => state.data.userMediations,
  userMediations =>
    userMediations && (
      BEFORE_COUNT >= userMediations.length
        ? BEFORE_COUNT
        : 1
    )
)

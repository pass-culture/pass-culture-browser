const UPDATE_SEED_LAST_REQUEST_TIMESTAMP = 'UPDATE_SEED_LAST_REQUEST_TIMESTAMP'

const initialState = {
  seedLastRequestTimestamp: Date.now(),
}

const paginationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_SEED_LAST_REQUEST_TIMESTAMP:
      return Object.assign({}, state, { seedLastRequestTimestamp: action.seedLastRequestTimestamp })
    default:
      return state
  }
}

export const updateSeedLastRequestTimestamp = seedLastRequestTimestamp => ({
  seedLastRequestTimestamp,
  type: UPDATE_SEED_LAST_REQUEST_TIMESTAMP,
})

export default paginationReducer

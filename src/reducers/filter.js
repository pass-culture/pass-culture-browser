export const TOGGLE_FILTER_MENU = 'TOGGLE_FILTER_MENU'

// ACTION CREATOR
export const toggleFilterMenu = () => ({
  type: TOGGLE_FILTER_MENU,
})

// REDUCER
const filter = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_FILTER_MENU:
      return !state
    default:
      return state
  }
}

export default filter

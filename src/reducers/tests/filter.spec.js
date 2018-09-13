import filter, { toggleFilterMenu, TOGGLE_FILTER_MENU } from '../filter'

describe('src | reducers | filter  ', () => {
  let state
  beforeEach(() => {
    state = {}
  })

  it('should return the initial state by default', () => {
    // given
    const action = {}

    // when
    const updatedState = filter(state, action)

    // then
    expect(updatedState).toEqual(state)
  })

  describe('When action.type is MAKE_UNDRAGGABLE', () => {
    it('should return correct update state', () => {
      // given
      const action = { type: TOGGLE_FILTER_MENU }

      // when
      const queriesReducer = filter(false, action)
      const expected = true

      // then
      expect(queriesReducer).toEqual(expected)
    })
  })
})

describe('src | actions', () => {
  describe('toggleFilterMenu', () => {
    it('should return correct action type', () => {
      // when
      const action = toggleFilterMenu({})
      const expected = {
        type: TOGGLE_FILTER_MENU,
      }

      // then
      expect(action).toMatchObject(expected)
    })
  })
})

import cachedSearchSelector from '../search'

describe('createOfferSelector', () => {
  const state = {}
  it('should select the global state', () => {
    const search = 'FakeText'
    const expected = {
      search: 'FakeText',
    }
    expect(cachedSearchSelector(state, search)).toEqual(expected)
  })
  it.skip('should select the query Params in the state', () => {
    const search = ''
    const expected = {
      search: 'FakeText',
    }
    expect(cachedSearchSelector(state, search)).toEqual(expected)
  })
})

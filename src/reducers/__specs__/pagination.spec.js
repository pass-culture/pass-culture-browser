import paginationReducer, { updateSeedLastRequestTimestamp } from '../pagination'

describe('src | reducers | pagination', () => {
  describe('actions', () => {
    it('should return an action of type UPDATE_SEED_LAST_REQUEST_TIMESTAMP', () => {
      // given
      const timestamp = 1574186119058

      // when
      const result = updateSeedLastRequestTimestamp(timestamp)

      // then
      expect(result).toStrictEqual({
        seedLastRequestTimestamp: 1574186119058,
        type: 'UPDATE_SEED_LAST_REQUEST_TIMESTAMP',
      })
    })
  })

  describe('reducers', () => {
    it('should return initial value when no action matches', () => {
      // when
      const nextState = paginationReducer()

      // then
      expect(nextState).toStrictEqual({
        seedLastRequestTimestamp: expect.any(Number),
      })
    })

    describe('when a UPDATE_SEED_LAST_REQUEST_TIMESTAMP action is received', () => {
      it('should update seed last request timestamp', () => {
        // when
        const nextState = paginationReducer(
          { seedLastRequestTimestamp: 1574186119058 },
          { seedLastRequestTimestamp: 167283098390, type: 'UPDATE_SEED_LAST_REQUEST_TIMESTAMP' }
        )

        // then
        expect(nextState).toStrictEqual({
          seedLastRequestTimestamp: 167283098390,
        })
      })
    })
  })
})

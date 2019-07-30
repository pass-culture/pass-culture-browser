import { mapDispatchToProps, mapStateToProps, mergeFavoriteData } from '../FavoriteContainer'

describe('src | components | verso | verso-controls | favorite | FavoriteContainer', () => {
  describe('mapStateToProps', () => {
    it('should return the right props', () => {
      // given
      const ownProps = {}
      const state = { data: { features: [] } }

      // when
      const props = mapStateToProps(state, ownProps)

      // then
      expect(props).toStrictEqual({
        isFeatureDisabled: true,
      })
    })
  })

  describe('mergeFavoriteData()', () => {
    it('should merge data with the store when the offer is already in favorites', () => {
      // given
      const dispatch = jest.fn()
      const isFavorite = true
      const recommendation = {}
      const ownProps = { recommendation }
      const state = { data: { features: [] } }
      const action = { payload: { datum: {} } }

      // when
      mergeFavoriteData(dispatch, ownProps)(isFavorite)(state, action)

      // then
      expect(dispatch).toHaveBeenCalledWith({
        config: {},
        patch: {
          recommendations: [
            {
              offer: {
                favorites: [],
              },
            },
          ],
        },
        type: 'MERGE_DATA',
      })
    })

    it('should merge data with the store when the offer is not in favorites', () => {
      // given
      const dispatch = jest.fn()
      const isFavorite = false
      const ownProps = {
        recommendation: {},
      }
      const state = { data: { features: [] } }
      const action = {
        payload: {
          datum: 'toto',
        },
      }

      // when
      mergeFavoriteData(dispatch, ownProps)(isFavorite)(state, action)

      // then
      expect(dispatch).toHaveBeenCalledWith({
        config: {},
        patch: {
          recommendations: [
            {
              offer: {
                favorites: ['toto'],
              },
            },
          ],
        },
        type: 'MERGE_DATA',
      })
    })
  })

  describe('mapDispatchToProps()', () => {
    it('should add to favorites', () => {
      // given
      const dispatch = jest.fn()
      const mediationId = 'FA'
      const offerId = 'ME'
      const recommendation = {
        mediationId,
        offerId,
      }
      const ownProps = { recommendation }
      const isFavorite = false
      const showFailModal = jest.fn()

      // when
      mapDispatchToProps(dispatch, ownProps).handleFavorite(isFavorite, showFailModal)()

      // then
      expect(dispatch).toHaveBeenCalledWith({
        config: {
          apiPath: '/favorites',
          body: {
            mediationId,
            offerId,
          },
          handleFail: showFailModal,
          handleSuccess: expect.any(Function),
          method: 'POST',
        },
        type: 'REQUEST_DATA_POST_/FAVORITES',
      })
    })

    it('should delete favorite', () => {
      // given
      const dispatch = jest.fn()
      const mediationId = 'FA'
      const offerId = 'ME'
      const recommendation = {
        mediationId,
        offerId,
      }
      const ownProps = { recommendation }
      const isFavorite = true
      const showFailModal = jest.fn()

      // when
      mapDispatchToProps(dispatch, ownProps).handleFavorite(isFavorite, showFailModal)()

      // then
      expect(dispatch).toHaveBeenCalledWith({
        config: {
          apiPath: `/favorites/${offerId}/${mediationId}`,
          body: {
            mediationId,
            offerId,
          },
          handleFail: showFailModal,
          handleSuccess: expect.any(Function),
          method: 'DELETE',
        },
        type: `REQUEST_DATA_DELETE_/FAVORITES/${offerId.toUpperCase()}/${mediationId.toUpperCase()}`,
      })
    })
  })
})

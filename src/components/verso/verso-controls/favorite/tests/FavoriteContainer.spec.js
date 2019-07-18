import { mergeFavoriteData, mapDispatchToProps } from '../FavoriteContainer'

describe('src | components | verso | verso-controls | favorite | FavoriteContainer', () => {
  describe('mergeFavoriteData()', () => {
    it('should merge data with the store when the offer is already in favorites', () => {
      // given
      const dispatch = jest.fn()
      const isFavorite = true
      const recommendation = {}
      const ownProps = {
        recommendation,
      }
      const state = {}
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
      const state = {}
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
          apiPath: '/offers/favorites',
          body: {
            mediationId,
            offerId,
          },
          handleFail: showFailModal,
          handleSuccess: expect.any(Function),
          method: 'POST',
          stateKey: 'offersFavorites',
        },
        type: 'REQUEST_DATA_POST_OFFERSFAVORITES',
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
          apiPath: `/offers/favorites/${offerId}/${mediationId}`,
          body: {
            mediationId,
            offerId,
          },
          handleFail: showFailModal,
          handleSuccess: expect.any(Function),
          method: 'DELETE',
          stateKey: 'offersFavorites',
        },
        type: 'REQUEST_DATA_DELETE_OFFERSFAVORITES',
      })
    })
  })
})

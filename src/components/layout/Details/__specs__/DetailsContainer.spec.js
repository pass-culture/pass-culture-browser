import { mapDispatchToProps, mapStateToProps } from '../DetailsContainer'
import { requestData } from '../../../../utils/fetch-normalize-data/requestData'

jest.mock('../../../../utils/fetch-normalize-data/requestData', () => ({
  requestData: jest.fn()
}))


describe('src | components | layout | Details | DetailsContainer', () => {
  let ownProps
  let state

  beforeEach(() => {
    ownProps = {
      match: {
        params: {
          booking: 'reservation',
          confirmation: 'confirmation',
        },
      },
    }
  })

  describe('mapStateToProps', () => {
    it('should return an object confirming cancellation', () => {
      // when
      const props = mapStateToProps(state, ownProps)

      // then
      expect(props).toStrictEqual({
        cancelView: true,
      })
    })

    it('should return an object not confirming cancellation', () => {
      // given
      ownProps.match.params.confirmation = undefined

      // when
      const props = mapStateToProps(state, ownProps)

      // then
      expect(props).toStrictEqual({
        cancelView: false,
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('should not load offer details when offer id is not defined', () => {
      // given
      const dispatch = jest.fn()

      // when
      mapDispatchToProps(dispatch).getOfferById(undefined)

      // then
      expect(dispatch).not.toHaveBeenCalled()
    })

    it('should load offer details', () => {
      // given
      const dispatch = jest.fn()

      // when
      mapDispatchToProps(dispatch).getOfferById('AE')

      // then
      expect(dispatch).toHaveBeenCalled()
      expect(requestData).toHaveBeenCalled()
      expect(requestData.mock.calls[0][0]).toMatchObject({
        apiPath: '/offers/AE'
      })
    })
  })
})

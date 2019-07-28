import getIsNotAnActivationRecommendation from '../getIsNotAnActivationRecommendation'

describe('src | components | pages | my-bookings | helpers | getIsNotAnActivationRecommendation', () => {
  describe('getIsNotAnActivationRecommendation', () => {
    it('should be false when it is a recommendation without offer', () => {
      // given
      const recommendation = {}

      // when
      const result = getIsNotAnActivationRecommendation(recommendation)

      // then
      const expected = false
      expect(result).toStrictEqual(expected)
    })

    it('should be false when it is not an activation type', () => {
      // given
      const recommendation = {
        offer: {
          type: 'EventType.ANY',
        },
      }

      // when
      const result = getIsNotAnActivationRecommendation(recommendation)

      // then
      const expected = true
      expect(result).toStrictEqual(expected)
    })

    it('should be false when it is an activation type (event)', () => {
      // given
      const recommendation = {
        offer: {
          type: 'EventType.ACTIVATION',
        },
      }

      // when
      const result = getIsNotAnActivationRecommendation(recommendation)

      // then
      const expected = false
      expect(result).toStrictEqual(expected)
    })

    it('should be false when it is an activation type (thing)', () => {
      // given
      const recommendation = {
        offer: {
          type: 'ThingType.ACTIVATION',
        },
      }

      // when
      const result = getIsNotAnActivationRecommendation(recommendation)

      // then
      const expected = false
      expect(result).toStrictEqual(expected)
    })
  })
})

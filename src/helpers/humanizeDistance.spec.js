/* eslint no-console: 0, max-nested-callbacks: 0 */
import { expect } from 'chai'

import { humanizeDistance } from './humanizeDistance'

describe('humanizeDistance', () => {
  describe('doit retourner une distance arrondie (m)', () => {
    it('step +- 1 si < 30', () => {
      let value = 3
      let expected = '3 m'
      let result = humanizeDistance(value)
      expect(result).to.equal(expected)
      value = 11.49
      expected = '11 m'
      result = humanizeDistance(value)
      expect(result).to.equal(expected)
      value = 26.74
      expected = '27 m'
      result = humanizeDistance(value)
      expect(result).to.equal(expected)
    })
    it('step +-5 si >= 30 < 100', () => {
      let value = 32.49
      let expected = '30 m'
      let result = humanizeDistance(value)
      expect(result).to.equal(expected)
      value = 32.5
      expected = '35 m'
      result = humanizeDistance(value)
      value = 35.49
      expected = '35 m'
      result = humanizeDistance(value)
      expect(result).to.equal(expected)
      expect(result).to.equal(expected)
      value = 39.5
      expected = '40 m'
      result = humanizeDistance(value)
      expect(result).to.equal(expected)
      value = 99.99
      expected = '100 m'
      result = humanizeDistance(value)
      expect(result).to.equal(expected)
    })
    it('step +-10 si >= 100 < 1000', () => {
      let value = 104.99
      let expected = '100 m'
      let result = humanizeDistance(value)
      expect(result).to.equal(expected)
      value = 105
      expected = '110 m'
      result = humanizeDistance(value)
      expect(result).to.equal(expected)
      expect(result).to.equal(expected)
      value = 994.999
      expected = '990 m'
      result = humanizeDistance(value)
      expect(result).to.equal(expected)
      value = 995.001
      expected = '1000 m'
      result = humanizeDistance(value)
      expect(result).to.equal(expected)
    })
  })
  describe('doit retourner une distance arrondie (km)', () => {
    it('step +-100 si >= 1000 < 5000', () => {
      let value = 1049
      let expected = '1 km'
      let result = humanizeDistance(value)
      expect(result).to.equal(expected)
      value = 1050
      expected = '1.1 km'
      result = humanizeDistance(value)
      expect(result).to.equal(expected)
      value = 4449.99
      expected = '4.4 km'
      result = humanizeDistance(value)
      expect(result).to.equal(expected)
      value = 4499.99
      expected = '4.5 km'
      result = humanizeDistance(value)
      expect(result).to.equal(expected)
    })
  })
  describe('doit retourner une distance arrondie (km)', () => {
    it('step +-1000 si >= 5000', () => {
      let value = 5000
      let expected = '5 km'
      let result = humanizeDistance(value)
      expect(result).to.equal(expected)
      value = 5000.99
      expected = '5 km'
      result = humanizeDistance(value)
      expect(result).to.equal(expected)
      value = 16449.99
      expected = '16 km'
      result = humanizeDistance(value)
      expect(result).to.equal(expected)
    })
  })
})

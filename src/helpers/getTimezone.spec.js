/* eslint no-console: 0, max-nested-callbacks: 0 */
import { expect } from 'chai'
import { getTimezone } from '.'

const defaultTimezone = 'Europe/Paris'
const cayenneTimezone = 'America/Cayenne'

describe('getTimezone', () => {
  it('retourne la timezone par default si pas valide', () => {
    let value = ''
    let result = getTimezone(value)
    expect(defaultTimezone).to.equal(result)
    value = null
    result = getTimezone(value)
    expect(defaultTimezone).to.equal(result)
    value = []
    result = getTimezone(value)
    expect(defaultTimezone).to.equal(result)
    value = true
    result = getTimezone(value)
    expect(defaultTimezone).to.equal(result)
    value = false
    result = getTimezone(value)
    expect(defaultTimezone).to.equal(result)
    value = 0
    result = getTimezone(value)
    expect(defaultTimezone).to.equal(result)
    value = undefined
    result = getTimezone(value)
    expect(defaultTimezone).to.equal(result)
  })
  it('retourne la timezone par default si autre code departement', () => {
    let value = '34'
    let result = getTimezone(value)
    expect(defaultTimezone).to.equal(result)
    value = 75
    result = getTimezone(value)
    expect(defaultTimezone).to.equal(result)
    value = 974
    result = getTimezone(value)
    expect(defaultTimezone).to.equal(result)
    value = 'undefined'
    result = getTimezone(value)
    expect(defaultTimezone).to.equal(result)
    value = '0'
    result = getTimezone(value)
    expect(defaultTimezone).to.equal(result)
  })
  it('retourne la timezone des departements pour Cayenne', () => {
    let value = 97
    let result = getTimezone(value)
    expect(cayenneTimezone).to.equal(result)
    value = '973'
    result = getTimezone(value)
    expect(cayenneTimezone).to.equal(result)
  })
})

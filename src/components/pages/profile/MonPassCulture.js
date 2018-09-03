/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'

const getPercent = expense => {
  const { actual, max } = expense
  return Math.round((actual * 100) / max)
}

const MonPassCulture = ({ provider }) => {
  const { expenses } = provider
  const percentAll = getPercent(expenses.all)
  console.log('percentAll', percentAll)
  const percentDigital = getPercent(expenses.digital)
  console.log('percentDigital', percentDigital)
  const percentPhysical = getPercent(expenses.physical)
  console.log('percentPhysical', percentPhysical)
  return (
    <div>
      <h3 className="dotted-bottom-primary is-primary-text is-uppercase pb8 px12">
        <i>Mon PassCulture</i>
      </h3>
      <div id="wallet-jauges" className="pb40">
        <div className="flex-columns flex-center padded">
          <div className="col1of2 jauges is-relative text-right flex-rows flex-end pr12">
            <span className="text all flex-1">
              <b className="is-block">Il reste {expenses.all.actual} €</b>
              <span className="is-block">sur vore Pass Culture</span>
            </span>
            <span className="text physical flex-0 mt12">
              <span className="is-block">
                jusqu&apos;à <b>{expenses.physical.actual} €</b>
              </span>
              <span className="is-block">pour les biens culturels</span>
            </span>
            <span className="text digital flex-0 mt12">
              <span className="is-block">
                jusqu&apos;à <b>{expenses.digital.actual} €</b>
              </span>
              <span className="is-block">pour les offres numériques</span>
            </span>
          </div>
          <div className="col1of2 jauges is-relative">
            <div className="jauge" style={{ top: 0 }} />
            <div className="jauge all" style={{ top: 0 }}>
              <div className="jauge physical" style={{ top: 0 }} />
              <div className="jauge digital" style={{ top: 0 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
MonPassCulture.defaultProps = {}
MonPassCulture.propTypes = {
  provider: PropTypes.object.isRequired,
}
export default MonPassCulture

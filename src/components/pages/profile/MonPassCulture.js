/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'

const jaugesStyles = {
  container: { height: 'auto' },
  digital: { height: '38px', top: `${12 + 38 + 8}px` },
  physical: { height: '38px', top: '12px' },
}

const getPercent = (expense, scale) => {
  const { actual, max } = expense
  const percent = Math.round((actual * 100) / max)
  return percent * scale
}

const MonPassCulture = ({ provider }) => {
  const { expenses } = provider
  expenses.all.actual = 500
  let scale = 1
  const percentOverall = getPercent(expenses.all, scale)
  //
  expenses.physical.actual = expenses.physical.max // 100%
  scale = expenses.physical.max / expenses.all.max
  const percentPhysical = getPercent(expenses.physical, scale)
  //
  expenses.digital.actual = expenses.digital.max
  scale = expenses.digital.max / expenses.all.max
  const percentDigital = getPercent(expenses.digital, scale)
  return (
    <div id="mon-pass-culuture">
      <h3 className="dotted-bottom-primary is-primary-text is-uppercase pb8 px12">
        <i>Mon PassCulture</i>
      </h3>
      <div id="wallet-jauges" className="jauges padded mb40">
        <div className="text overall flex-1">
          <b className="is-block">Il reste {expenses.all.actual} €</b>
          <span className="is-block">sur vore Pass Culture</span>
        </div>
        <div className="flex-columns flex-center mt12">
          <div className="text-containers text-right flex-0 mr8">
            <div className="text physical mt12">
              <span className="is-block">
                jusqu&apos;à <b>{expenses.physical.actual} €</b>
              </span>
              <span className="is-block">pour les biens culturels</span>
            </div>
            <div className="text digital mt8">
              <span className="is-block">
                jusqu&apos;à <b>{expenses.digital.actual} €</b>
              </span>
              <span className="is-block">pour les offres numériques</span>
            </div>
          </div>
          <div
            className="jauges-container flex-1"
            style={{ ...jaugesStyles.container }}
          >
            <div
              className="jauge overall"
              style={{ width: `${percentOverall}%` }}
            />
            <div
              className="jauge digital"
              style={{ ...jaugesStyles.digital, width: `${percentDigital}%` }}
            />
            <div
              className="jauge physical"
              style={{ ...jaugesStyles.physical, width: `${percentPhysical}%` }}
            />
          </div>
        </div>
        {/* <div className="jauges is-relative">
          <div className="jauge" style={{ right: 0 }} />
          <div className="jauge all" style={{ height: `${percentAll}%` }}>
            <div
              className="jauge physical"
              style={{ height: `${percentPhysical}%` }}
            />
            <div
              className="jauge digital"
              style={{ height: `${percentDigital}%` }}
            />
          </div>
        </div> */}
        {/* <div className="flex-columns flex-center padded">
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
            <div className="jauge all" style={{ height: `${percentAll}%` }}>
              <div
                className="jauge physical"
                style={{ height: `${percentPhysical}%` }}
              />
              <div
                className="jauge digital"
                style={{ height: `${percentDigital}%` }}
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
MonPassCulture.defaultProps = {}
MonPassCulture.propTypes = {
  provider: PropTypes.object.isRequired,
}
export default MonPassCulture

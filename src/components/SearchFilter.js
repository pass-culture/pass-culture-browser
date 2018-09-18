import PropTypes from 'prop-types'
import moment from 'moment'
import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

import SearchByOfferType from './SearchByOfferType'

const transitionDelay = 250
const transitionDuration = 250

const defaultStyle = {
  opacity: '0',
  top: '100vh',
  transitionDuration: `${transitionDuration}ms`,
  transitionProperty: 'opacity, top',
  transitionTimingFunction: 'ease',
}

const transitionStyles = {
  entered: { opacity: 1, top: 0 },
  entering: { opacity: 0, top: '100vh' },
}

// export const SearchFilter = ({
//   handleClearQueryParams,
//   handleQueryParamsChange,
// }) => (
//   <div className="search-filter">
//     <form>
//       <div>
//         <h2>DATE</h2>
//         <div className="field checkbox">
//           <label id="from_date" className="label">
//             Tout de suite !
//           </label>
//           <input
//             id="from_date"
//             className="input is-normal"
//             onChange={() =>
//               handleQueryParamsChange({ from_date: moment.now() })
//             }
//             type="checkbox"
//           />
//         </div>
//         <div className="field checkbox">
//           <label id="from_date" className="label">
//             Entre 1 et 5 jours
//           </label>
//           <input
//             id="from_date"
//             className="input is-normal"
//             onChange={() =>
//               handleQueryParamsChange({ from_date: moment.now() })
//             }
//             type="checkbox"
//           />
//         </div>
//       </div>
//       <div>
//         <h2>DISTANCE</h2>
//         <select
//           name="select"
//           className="select"
//           onChange={() => handleQueryParamsChange({ distance: 'value' })}>
//           {/*  { distance: 1 } */}
//           <option value="1">Moins d'1 km</option>
//           <option value="2">Moins de 10 km</option>
//           <option value="3">Moins de 50 km</option>
//           <option value="4">Toutes distances</option>
//         </select>
//       </div>
//       <div>
//         <h2>QUOI</h2>
//         <div className="field checkbox">
//           <label id="from_date" className="label">
//             Applaudir
//           </label>
//           <input
//             id="from_date"
//             className="input is-normal"
//             onChange={() =>
//               handleQueryParamsChange({ from_date: moment.now() })
//             }
//             type="checkbox"
//           />
//         </div>
//       </div>
//       <button className="button" type="button" onClick={handleClearQueryParams}>
//         Réinitialiser
//       </button>
//       <button className="button" type="submit">
//         Filtrer
//       </button>
//     </form>
//   </div>
// )
// const transitionDelay = 250
// const transitionDuration = 250
//
// const defaultStyle = {
//   opacity: '0',
//   top: '100vh',
//   transitionDuration: `${transitionDuration}ms`,
//   transitionProperty: 'opacity, top',
//   transitionTimingFunction: 'ease',
// }
//
// const transitionStyles = {
//   entered: { opacity: 1, top: 0 },
//   entering: { opacity: 0, top: '100vh' },
// }

class SearchFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      handleClearQueryParams,
      handleQueryParamsChange,
      handleSearchFilterChange,
      isVisible,
    } = this.props

    return (
      <Transition in={isVisible} timeout={transitionDelay}>
        {state => (
          <div
            id="search-filter-menu"
            className="is-overlay is-clipped flex-columns items-end p12"
            style={{ ...defaultStyle, ...transitionStyles[state] }}
          >
            <div className="search-filter">
              <form onSubmit={handleSearchFilterChange}>
                <div>
                  <h2>
DATE (Scrollable horizontally)
                  </h2>
                  <div className="field checkbox">
                    <label id="from_date" className="label">
                      {' '}
                      Tout de suite !
                    </label>
                    <input
                      id="from_date"
                      className="input is-normal"
                      onChange={() =>
                        handleQueryParamsChange({ from_date: moment.now() })
                      }
                      type="checkbox"
                    />
                  </div>
                  <div className="field checkbox">
                    <label id="from_date" className="label">
                      {' '}
                      Entre 1 et 5 jours
                    </label>
                    <input
                      id="from_date"
                      className="input is-normal"
                      onChange={() =>
                        handleQueryParamsChange({ from_date: moment.now() })
                      }
                      type="checkbox"
                    />
                  </div>
                  <div className="field checkbox">
                    <label id="from_date" className="label">
                      {' '}
                      Plus de 5 jours
                    </label>
                    <input
                      id="from_date"
                      className="input is-normal"
                      onChange={() =>
                        handleQueryParamsChange({ from_date: moment.now() })
                      }
                      type="checkbox"
                    />
                  </div>
                  <div>
Par date / Date picker
                  </div>
                </div>
                <div>
                  <h2>
OU
                  </h2>
                  <select
                    className="select"
                    // value={this.state.distance} // eslint-disable-line
                    // onChange={() => handleQueryParamsChange(this.state)}
                    onChange={() => handleQueryParamsChange()}
                    name="distance"
                  >
                    <option value="1">
                      {' '}
Moins d&apos;1 km
                      {' '}
                    </option>
                    <option value="10">
Moins de 10 km
                    </option>
                    <option value="50">
Moins de 50 km
                    </option>
                    <option value="">
Toutes distances
                    </option>
                  </select>
                </div>
                <SearchByOfferType
                  handleQueryParamsChange={handleQueryParamsChange}
                  title="QUOI"
                />
                <button
                  className="button"
                  type="button"
                  onClick={handleClearQueryParams}
                >
                  Réinitialiser
                </button>
                <button className="button" type="submit">
                  Filtrer
                </button>
              </form>
            </div>
          </div>
        )}
      </Transition>
    )
  }
}

SearchFilter.propTypes = {
  handleClearQueryParams: PropTypes.func.isRequired,
  handleQueryParamsChange: PropTypes.func.isRequired,
  handleSearchFilterChange: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
}

export default SearchFilter

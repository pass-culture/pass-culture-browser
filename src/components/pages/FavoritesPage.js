/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestData } from 'pass-culture-shared'

import { ROOT_PATH } from '../../utils/config'
import Loader from '../layout/Loader'
import PageHeader from '../layout/PageHeader'
import NavigationFooter from '../layout/NavigationFooter'
import FavoritesListItem from './favorites/FavoritesListItem'

class FavoritesPage extends React.PureComponent {
  constructor(props) {
    super(props)
    const { dispatch } = props
    this.state = { favorites: [], isloading: false }
    this.actions = bindActionCreators({ requestData }, dispatch)
  }

  componentDidMount = () => {
    console.log('FavoritesPage ---> componentDidMount')
    const nextstate = { isloading: true }
    const route = 'recommendations/favorites'
    this.setState(nextstate, () =>
      this.actions.requestData('GET', route, {
        handleFail: this.handleRequestFail,
        handleSuccess: this.handleRequestSuccess,
      })
    )
  }

  handleRequestFail = () => {
    this.setState({ isloading: false })
  }

  handleRequestSuccess = (state, action) => {
    const favorites = action.data
    this.setState({ favorites, isloading: false })
  }

  render() {
    const { isloading, favorites } = this.state
    const backgroundImage = `url('${ROOT_PATH}/mosaic-k.png')`
    return (
      <div id="favorites-page" className="page is-relative flex-rows">
        {!isloading && (
          <React.Fragment>
            <PageHeader
              theme="red"
              title="Mes préférés"
              className="dotted-bottom-white"
            />
            <div className="pc-gradient flex-rows flex-1">
              <main
                role="main"
                className="pc-main padded my12"
                style={{ backgroundImage }}
              >
                <ul className="favorites-list">
                  {favorites &&
                    favorites.map(obj => (
                      <FavoritesListItem
                        key={obj.id}
                        item={obj}
                        className="pc-theme-default"
                      />
                    ))}
                </ul>
              </main>
              <NavigationFooter
                theme="transparent"
                className="dotted-top-white"
              />
            </div>
          </React.Fragment>
        )}
        <Loader isloading={isloading} />
      </div>
    )
  }
}

FavoritesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(FavoritesPage)

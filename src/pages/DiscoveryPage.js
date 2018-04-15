import React, { Component } from 'react'
import { compose } from 'redux'

import MenuButton from '../components/layout/MenuButton'
import Deck from '../components/Deck'
import withLogin from '../hocs/withLogin'


class DiscoveryPage extends Component {
  render () {
    return (
      <main className='page discovery-page center'>
        <Deck />
        <MenuButton borderTop />
      </main>
    )
  }
}

export default compose(
  withLogin({ isRequired: true })
)(DiscoveryPage)

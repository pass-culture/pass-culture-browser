import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'

import Deck from '../Deck'
import PageWrapper from '../layout/PageWrapper'
import withLogin from '../hocs/withLogin'
import { getDiscoveryPath } from '../../utils/routes'

class DiscoveryPage extends Component {
  handleSetRedirectTo(nextProps) {
    // ONLY TRIGGER AT MOUNT TIME
    // OR WHEN WE RECEIVED FRESH NON EMPTY DATA
    const props = nextProps || this.props
    const { mediationId, occasionType, history, recommendations } = props
    if (
      occasionType || mediationId ||
      (nextProps && !nextProps.recommendations) ||
      !recommendations || !recommendations.length
    ) {
      return
    }

    const path = getDiscoveryPath(recommendations[0])
    history.push(path)
  }

  componentWillMount() {
    this.handleSetRedirectTo()
  }

  componentWillReceiveProps(nextProps) {
    this.handleSetRedirectTo(nextProps)
  }

  render() {
    return (
      <PageWrapper
        name="discovery"
        noPadding
        menuButton={{ borderTop: true }}
        backButton={this.props.backButton ? { className: 'discovery' } : null}
      >
        <Deck />
      </PageWrapper>
    )
  }
}

export default compose(
  withLogin({ isRequired: true }),
  withRouter,
  connect(state => ({
    backButton: state.router.location.search.indexOf('to=verso') > -1,
    recommendations: state.data.recommendations,
  }))
)(DiscoveryPage)

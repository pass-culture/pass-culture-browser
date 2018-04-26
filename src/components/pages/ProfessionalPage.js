import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'

import withLogin from '../hocs/withLogin'
import PageWrapper from '../layout/PageWrapper'
import OfferersGrid from '../pro/OfferersGrid'

class ProfessionalPage extends Component {
  handleSetRedirectTo = () => {
    const {
      history,
      match: { offererId },
      user
    } = this.props
    console.log('offererId', offererId, user)
    if (user.offerers && user.offerers.length) {
      const randomOffererId = user.offerers[
        Math.floor(Math.random() * user.offerers.length)
      ].id
      history.push(`/pro/${randomOffererId}`)
    }
  }

  componentDidUpdate () {
    this.handleSetRedirectTo()
  }

  render () {
    return (
      <PageWrapper name="professional">
        <div className="h2 mt2">Mes offres</div>
        <OfferersGrid />
      </PageWrapper>
    )
  }
}

export default compose(
  withLogin({ isRequired: true }),
  withRouter,
  connect(state => ({ user: state.user }))
)(ProfessionalPage)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { createSelector } from 'reselect'

import OfferItem from './OfferItem'
import { requestData } from '../../reducers/data'
import selectSortOffers from '../../selectors/sortOffers'

class OffersList extends Component {
  handleRequestData = props => {
    const {
      match: {
        params: { offererId },
      },
      requestData,
      user,
    } = props
    if (!this.hasRequired && user) {
      requestData('GET', `offers?offererId=${offererId}`)
      this.hasRequired = true
    }
  }

  componentWillMount() {
    this.props.user && this.handleRequestData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user !== this.props.user) {
      this.handleRequestData(nextProps)
    }
  }

  render() {
    const { offers } = this.props
    return (
      <div className="md-col-9 mx-auto">
        {offers &&
          offers.map((offer, index) => [
            <OfferItem isMediations isModify isPrices key={index} {...offer} />,
            index !== offers.length - 1 && <hr />,
          ])}
      </div>
    )
  }
}


export default compose(
  withRouter,
  connect(
    state => ({
      offers: selectSortOffers(state),
      user: state.user,
    }),
    { requestData }
  )
)(OffersList)

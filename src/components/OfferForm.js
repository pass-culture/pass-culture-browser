import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Select from './Select'
import BookForm from '../forms/BookForm'
import { assignForm } from '../reducers/form'
import { getCurrentWork } from '../reducers/request'

class OfferForm extends Component {
  componentWillReceiveProps (nextProps) {
    const { assignForm, newWork } = nextProps
    if (newWork && newWork !== this.props.newWork) {
      assignForm({ workId: newWork.id })
    }
  }
  onOptionClick = ({ target: { value } }) => {
    this.props.assignForm({ work: { category: value } })
  }
  render () {
    const { action, offer, options, selectedCategory } = this.props
    const currentCategory = selectedCategory || offer && offer.work.category
    if (action === 'delete') {
      return (
        <div>
          <div className='mb2'>
            Enlever cette offre ?
          </div>
          <button className='button button--alive mr2'>
            Oui
          </button>
          <button className='button button--alive'>
            Non
          </button>
        </div>
      )
    }
    return (
      <div className='offer-form'>
        {
          offer && (
            <div className='offer-form__hero flex items-center justify-around mb2 p1'>
              <img alt='thumbnail'
                className='offer-form__image mb1'
                src={offer.thumbnailUrl || offer.work.thumbnailUrl}
              />
              <div>
                {offer.name}
              </div>
            </div>
          )
        }
        <Select className='select mb2'
          defaultLabel='-- select a type --'
          onOptionClick={this.onOptionClick}
          options={options}
          value={currentCategory}
        />
        { currentCategory === 'book' && <BookForm /> }
      </div>
    )
  }
}

OfferForm.defaultProps = {
  options: [
    { value: 'book', label: 'Book' },
    { value: 'theater', label: 'Theater' }
  ]
}

const getCurrentOffer = createSelector(state => state.request.offers,
  (state, ownProps) => ownProps.id,
  (offers, id) => offers.find(offer => offer.id === id)
)

export default connect((state, ownProps) => {
  return {
    newWork: getCurrentWork(state),
    offer: getCurrentOffer(state, ownProps),
    selectedCategory: state.form && state.form.work && state.form.work.category
  }
}, { assignForm })(OfferForm)

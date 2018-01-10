import React, { Component } from 'react'
import { connect } from 'react-redux'

import Select from './Select'
import BookForm from '../forms/BookForm'
import { assignForm } from '../reducers/form'
import { getCurrentWork } from '../reducers/request'

class NewOffer extends Component {
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
    const { options, selectedCategory } = this.props
    return (
      <div className='new-offer'>
        <Select className='select mb2'
          defaultLabel='-- select a type --'
          onOptionClick={this.onOptionClick}
          options={options}
          value={selectedCategory}
        />
        { selectedCategory === 'book' && <BookForm /> }
      </div>
    )
  }
}

NewOffer.defaultProps = {
  options: [
    { value: 'book', label: 'Book' },
    { value: 'theater', label: 'Theater' }
  ]
}

export default connect((state, ownProps) => {
  return {
    newWork: getCurrentWork(state),
    selectedCategory: state.form && state.form.work && state.form.work.category
  }
}, { assignForm })(NewOffer)

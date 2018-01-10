import React, { Component } from 'react'

import FormInput from './FormInput'

class PriceItem extends Component {
  render () {
    console.log('his.props', this.props)
    const { endDate, startDate, size, value } = this.props
    return (
      <div className='price-item'>
        <FormInput defaultValue={startDate}
          name='startDate'
        />
        <FormInput defaultValue={endDate}
          name='endDate'
        />
        <FormInput defaultValue={size}
          name='size'
        />
        <FormInput defaultValue={value}
          name='value'
        />
      </div>
    )
  }
}

export default PriceItem

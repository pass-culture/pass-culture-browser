// jest --env=jsdom ./src/components/booking/tests/BookingError --watch
import React from 'react'
import { shallow } from 'enzyme'

import BookingError from '../BookingError'

describe('src | components | pages | search | BookingError', () => {
  describe('snapshot', () => {
    it('should match snapshot with empty errors', () => {
      // given
      const props = { errors: {} }
      // when
      const wrapper = shallow(<BookingError {...props} />)
      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
    it('should match snapshot with errors as array', () => {
      // given
      const props = { errors: ['do not output something'] }
      // when
      const wrapper = shallow(<BookingError {...props} />)
      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
    it('should match snapshot with errors as object with array', () => {
      // given
      const props = {
        errors: {
          reason_1: ['Reason value 1'],
          reason_2: ['Reason value 2'],
          reason_34: ['Reason value 3', 'Reason value 4'],
        },
      }
      // when
      const wrapper = shallow(<BookingError {...props} />)
      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })
})

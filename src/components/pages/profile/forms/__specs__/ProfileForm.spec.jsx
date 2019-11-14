import { shallow } from 'enzyme'
import React from 'react'

import ProfileForm from '../ProfileForm'

jest.mock('redux-thunk-data', () => {
  const { requestData } = jest.requireActual('fetch-normalize-data')

  return {
    requestData,
  }
})

describe('src | components | pages | profile | forms | ProfileForm', () => {
  let dispatch
  let goBack
  let replace
  let props

  beforeEach(() => {
    goBack = jest.fn()
    dispatch = jest.fn()
    replace = jest.fn()
    props = {
      WrappedComponent: React.PureComponent,
      config: {
        routeMethod: 'fake method',
        routePath: 'fake url',
        stateKey: 'fake state key',
      },
      dispatch,
      history: {
        goBack,
        replace,
      },
      initialValues: {},
      location: {
        pathname: 'fake location',
      },
      title: 'fake title',
      validator: () => {},
    }
  })

  it('should match the snapshot', () => {
    // when
    const wrapper = shallow(<ProfileForm {...props} />)

    // then
    expect(wrapper).toMatchSnapshot()
  })

  it('should render component with isLoading property from state to false', () => {
    // when
    const wrapper = shallow(<ProfileForm {...props} />)

    // then
    expect(wrapper.state('isLoading')).toBe(false)
  })

  describe('handleOnFormSubmit()', () => {
    it('should dispatch an action to update user informations', () => {
      // given
      const wrapper = shallow(<ProfileForm {...props} />)

      // when
      wrapper.instance().handleOnFormSubmit()

      // then
      expect(wrapper.state('isLoading')).toBe(true)
      expect(dispatch).toHaveBeenCalledWith({
        config: {
          apiPath: 'fake url',
          body: {},
          handleFail: expect.any(Function),
          handleSuccess: expect.any(Function),
          key: 'fake state key',
          method: 'fake method',
          resolve: expect.any(Function),
        },
        type: 'REQUEST_DATA_FAKE METHOD_FAKE URL',
      })
    })
  })

  describe('handleOnFormReset()', () => {
    it('should go back to previous page when resetting form', () => {
      // given
      const wrapper = shallow(<ProfileForm {...props} />)

      // when
      wrapper.instance().handleOnFormReset()

      // then
      expect(goBack).toHaveBeenCalledWith()
    })
  })

  describe('handleRequestSuccess()', () => {
    it('should redirect to success page when updating username', () => {
      // given
      const wrapper = shallow(<ProfileForm {...props} />)
      const formResolver = jest.fn()

      // when
      wrapper.instance().handleRequestSuccess(formResolver)()

      // then
      expect(wrapper.state('isLoading')).toBe(false)
      expect(formResolver).toHaveBeenCalledWith()
      expect(replace).toHaveBeenCalledWith('fake location/success')
    })
  })

  describe('handleRequestFail()', () => {
    it('should display errors in form', () => {
      // given
      const wrapper = shallow(<ProfileForm {...props} />)
      const formResolver = jest.fn()
      const state = {}
      const action = {
        payload: {
          errors: ['error1', 'error2'],
        },
      }

      // when
      wrapper.instance().handleRequestFail(formResolver)(state, action)

      // then
      expect(wrapper.state('isLoading')).toBe(false)
      expect(formResolver).toHaveBeenCalledWith({
        0: 'error1',
        1: 'error2',
      })
    })
  })
})

import { mount } from 'enzyme'
import React from 'react'
import withPageTracking from './withPageTracking'

describe('component | withPageTracking', () => {
  let fakeTracking

  beforeEach(() => {
    fakeTracking = {
      push: jest.fn(),
    }
    window._paq = fakeTracking
    window.location = 'url'
    document.title = 'titre de la page'
  })

  const MockComponent = () => (<div>
    {'Mocked component'}
  </div>)

  describe('when mount', () => {
    it('should track page view', () => {
      // given
      const WrappedPage = withPageTracking(MockComponent)

      // when
      mount(<WrappedPage />)

      // then
      expect(fakeTracking.push).toHaveBeenCalledTimes(3)
      expect(fakeTracking.push).toHaveBeenNthCalledWith(1, ['setCustomUrl', window.location])
      expect(fakeTracking.push).toHaveBeenNthCalledWith(2, ['setDocumentTitle', document.title])
      expect(fakeTracking.push).toHaveBeenNthCalledWith(3, ['trackPageView'])
    })
  })
})

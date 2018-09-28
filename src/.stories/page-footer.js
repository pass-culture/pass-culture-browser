import React from 'react'
// import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

// PC Components Stories
// import { configureStore } from '../utils/store'
import NavigationFooter from '../components/layout/NavigationFooter'

// const { store } = configureStore()

storiesOf('NavigationFooter', module)
  .addDecorator(getStory => (
    // <Provider store={store}>
    <MemoryRouter initialEntries={['/']}>{getStory()}</MemoryRouter>
    // </Provider>
  ))
  .add('with red theme', () => <NavigationFooter theme="red" />)
  .add('with submit button', () => <NavigationFooter theme="red" />)
  .add('with close button', () => <NavigationFooter theme="red" />)

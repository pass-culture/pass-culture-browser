import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

// PC Components Stories
import PageBackButton from '../components/layout/header/PageBackButton'
import PageCloseButton from '../components/layout/header/PageCloseButton'
import PageSubmitButton from '../components/layout/header/PageSubmitButton'

storiesOf('PageBackButton', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('with red theme', () => <PageBackButton theme="red" />)

storiesOf('PageCloseButton', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('with red theme', () => <PageCloseButton theme="red" />)

storiesOf('PageSubmitButton', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('with red theme', () => <PageSubmitButton theme="red" />)

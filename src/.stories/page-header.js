import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

// PC Components Stories
import PageHeader from '../components/layout/PageHeader'

storiesOf('PagHeader', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('with red theme', () => <PageHeader theme="red" title="Page title" />, {
    info: { soure: true },
  })
  .add('with submit button', () => (
    <PageHeader useSubmit useBack theme="red" title="Page title" />
  ))
  .add('with close button', () => (
    <PageHeader useClose theme="red" title="Page title" />
  ))

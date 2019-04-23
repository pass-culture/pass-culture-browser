import React from 'react'
import { Redirect } from 'react-router-dom'
import * as typeformEmbed from '@typeform/embed'

// TODO -> move to constants
const TYPEFORM_URL = 'https://passculture.typeform.com/to/T8rurj'

// Default values taken from official Typeform docs
// https://developer.typeform.com/embed/modes/
const TYPEFORM_OPTIONS = {
  autoClose: 5,
  autoOpen: false,
  hideFooter: true,
  hideHeaders: true,
  mode: 'popup',
  opacity: 100,
}

class ActivationTypeForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { isSubmitted: false }
    this.typeformElementContainer = null
  }

  componentDidMount() {
    const opts = {
      ...TYPEFORM_OPTIONS,
      onSubmit: this.onSubmitTypeForm,
    }
    const container = this.typeformElementContainer
    typeformEmbed.makeWidget(container, TYPEFORM_URL, opts)
  }

  onSubmitTypeForm = () => {
    this.setState({ isSubmitted: true })
  }

  render() {
    const { isSubmitted } = this.state
    if (isSubmitted) return <Redirect to="/decouverte" />
    return (
      <div
        className="is-overlay react-embed-typeform-container"
        ref={elt => {
          this.typeformElementContainer = elt
        }}
      />
    )
  }
}

export default ActivationTypeForm

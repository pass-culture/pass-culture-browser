import PropTypes from 'prop-types'
import React, { Component } from 'react'
import * as reactIconPack from 'react-icons/lib/md';

const NAMESPACE = 'http://www.w3.org/1999/xlink'

class Icon extends Component {
  componentDidUpdate () {
    // this is needed for Safari, won't redraw the use element otherwise
    if (this._useElement) {
      this._useElement.setAttributeNS(NAMESPACE, 'href', '#' + this.props.icon)
    }
  }
  render () {
    const { className, name } = this.props
    const iconName = 'Md' + name.replace(/(^|-)(\w)/g, (m0, m1, m2) => m2.toUpperCase());
    const reactIcon = reactIconPack[iconName]
    if (reactIcon) {
      return reactIcon()
    }
    return (
      <svg className={className || 'icon'}>
        <use ref={e => {
          if (e) {
            this._useElement = e
          }
        }} xlinkHref={'#' + name} />
      </svg>
    )
  }
}

Icon.propTypes = { icon: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Icon

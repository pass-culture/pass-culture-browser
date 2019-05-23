import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import ReplaceLink from './ReplaceLink'
import { getMenuItemIdFromPathname, getMenuItemPathTo } from './utils'
import Icon from '../layout/Icon'

const renderLinkContent = (icon, title, styles) => (
  <Fragment>
    <span
      style={styles}
      className="flex-0 text-center menu-icon mr16 text-center"
    >
      <Icon svg={`ico-${icon}`} alt="" />
    </span>
    <span className="flex-1 is-medium">{title}</span>
  </Fragment>
)

export class MenuItemContent extends React.PureComponent {
  renderNavLink = opts => {
    const { item, location } = this.props
    const { title, disabled, icon, path } = item
    const pathto = getMenuItemPathTo(location, item)
    const itemid = getMenuItemIdFromPathname(pathto, 'main-menu')
    return (
      <ReplaceLink
        key={path}
        to={pathto}
        id={itemid}
        disabled={disabled}
        action="replace"
        activeClassName={opts.activeClass}
        className={`navlink mx12 flex-columns ${opts.cssclass}`}
      >
        {renderLinkContent(icon, title)}
      </ReplaceLink>
    )
  }

  renderSimpleLink = opts => {
    const { item } = this.props
    const { disabled, href, icon, target, title } = item
    return (
      <a
        className={`navlink mx12 flex-columns ${opts.cssclass}`}
        disabled={disabled}
        href={href}
        key={href}
        rel={(target === '_blank' && 'noopener noreferer') || null}
        target={target}
      >
        {renderLinkContent(icon, title)}
      </a>
    )
  }

  render() {
    const { item, match } = this.props
    const isOnCardVerso = match.params.view === 'verso'
    const activeClass = isOnCardVerso ? null : 'active'
    const cssclass = (item.disabled && 'is-disabled') || ''
    const options = { activeClass, cssclass }
    if (item.href) return this.renderSimpleLink(options)
    return this.renderNavLink(options)
  }
}

MenuItemContent.propTypes = {
  item: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

const MenuItem = withRouter(MenuItemContent)

export default MenuItem

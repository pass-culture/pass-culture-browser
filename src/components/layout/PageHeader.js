/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'

import PageBackButton from './header/PageBackButton'
import PageCloseButton from './header/PageCloseButton'
import PageSubmitButton from './header/PageSubmitButton'

const PageHeader = ({
  canSubmit,
  className,
  isloading,
  theme,
  title,
  useBack,
  useClose,
  useSubmit,
}) => (
  <header className={`pc-theme-${theme} pc-header is-relative ${className}`}>
    {/* FIXME: a voir si géré par un switch ou des if */}
    {useBack &&
      !useClose && <PageBackButton disabled={isloading} theme={theme} />}
    <h1>
      <span>{title}</span>
    </h1>
    {useClose && <PageCloseButton disabled={isloading} theme={theme} />}
    {useSubmit && (
      <PageSubmitButton
        theme={theme}
        disabled={!canSubmit}
        isloading={isloading}
      />
    )}
  </header>
)

PageHeader.defaultProps = {
  canSubmit: true,
  className: '',
  isloading: false,
  theme: 'red',
  useBack: true,
  useClose: false,
  useSubmit: false,
}

PageHeader.propTypes = {
  canSubmit: PropTypes.bool,
  className: PropTypes.string,
  isloading: PropTypes.bool,
  theme: PropTypes.string,
  title: PropTypes.string.isRequired,
  useBack: PropTypes.bool,
  useClose: PropTypes.bool,
  useSubmit: PropTypes.bool,
}

export default PageHeader

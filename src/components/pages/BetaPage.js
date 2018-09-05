/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import { Link } from 'react-router-dom'

const BetaPage = () => (
  <div id="beta-page" className="page flex-rows">
    <main role="main" className="padded flex-rows flex-center">
      <h1 className="text-left">
        <i className="is-block">Bienvenue</i>
        <i className="is-block">dans la version beta</i>
        <i className="is-block">du Pass Culture</i>
      </h1>
      <p className="text-left mt36">
        <i className="is-block">Et merci de votre participation</i>
        <i className="is-block">pour nous aider à l&apos;améliorer !</i>
      </p>
    </main>
    <footer
      role="navigation"
      className="pc-footer dotted-top flex-columns items-center flex-end flex-0"
    >
      <Link to="/inscription" className="flex-center items-center">
        <i>C&apos;est par là</i>
        <span
          aria-hidden="true"
          className="icon-next-long"
          title="C&apos;est par là"
        />
      </Link>
    </footer>
  </div>
)

export default BetaPage

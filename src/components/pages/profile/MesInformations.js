/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { getOrderedFields } from './config'

const fields = getOrderedFields()
const SECTION_TITLE = 'Mes Informations'
const EMPTY_FIELD_PLACEHOLDER = 'Non renseigné'

/**
 * Representation en liste
 * Des champs de l'objet `user` provenant du store redux
 * Permet à l'user d'editer ses informations
 */
const MesInformations = ({ user }) => (
  // const dptCode = user.departementCode
  // const departementName = getDepartementByCode(dptCode)
  // const departement = `${dptCode} - ${departementName}`
  <div id="mes-informations" className="pb40 pt20">
    <h3 className="dotted-bottom-primary is-primary-text is-uppercase pb12 px12">
      <span className="is-italic">{SECTION_TITLE}</span>
    </h3>
    <div className="px12 list">
      {fields.map(field => {
        const { key, label, placeholder, resolver, routeName } = field
        // NOTE: par défaut on sette la valeur à user[key]
        // pour le password on ne souhaite pas afficher la valeur
        // -> pour cela on utilise donc le resolver qui retourne une valeur falsey
        // pour le nom/prénom du user on souhaite concatené les deux valeurs
        // -> pour cela on utilise donc le resolver qui retourne cette concatenation
        const text = (resolver && resolver(user, key)) || user[key]
        const routeLink = `/profil/${routeName}`
        const disabled = !field.editable
        return (
          <div key={key} className="item dotted-bottom-black">
            <NavLink
              to={routeLink}
              disabled={disabled}
              className="pc-text-button text-left no-decoration flex-columns items-center pt20 pb22"
            >
              <span className="is-block flex-1">
                <span className="pc-label pb3 is-block is-grey-text is-uppercase fs13">
                  {label}
                </span>
                {text && <b className="is-block is-black-text fs18">{text}</b>}
                {!text && (
                  <span className="is-block is-grey-text fs18">
                    {placeholder || EMPTY_FIELD_PLACEHOLDER}
                  </span>
                )}
              </span>
              {!disabled && (
                <span className="is-block flex-0">
                  <span
                    aria-hidden
                    className="icon-next"
                    title={`Modifier ${label}`}
                  />
                </span>
              )}
            </NavLink>
          </div>
        )
      })}
    </div>
  </div>
)

MesInformations.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
}

export default MesInformations

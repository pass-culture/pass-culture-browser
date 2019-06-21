import uuidv5 from 'uuid/v5'
import queryString from 'query-string'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { requestData } from 'redux-saga-data'

import TypeForm from './TypeForm'
import {
  selectCurrentUser,
  withRedirectToSigninOrTypeformAfterLogin,
} from '../../hocs'
import { TYPEFORM_URL_CULTURAL_PRACTICES_POLL } from '../../../utils/config'

const buildTypeformURLWithHiddenFields = userId => {
  const search = queryString.stringify({ userId })
  const url = `${TYPEFORM_URL_CULTURAL_PRACTICES_POLL}?${search}`
  return url
}

// NOTE: a déplacer dans une env_var secure + changer la clé
// en utilisant le paquet NPM `uuid`
// https://github.com/kelektiv/node-uuid#readme
const UUID = '82e6bb38-56fc-449a-ae22-16f19cfcecde'

export const mapStateToProps = state => {
  const currentUser = selectCurrentUser(state)
  const uniqId = uuidv5(currentUser.email, UUID)
  const typeformUrl = buildTypeformURLWithHiddenFields(uniqId)
  const { needsToFillCulturalSurvey } = currentUser || {}
  return { needsToFillCulturalSurvey, typeformUrl, uniqId }
}

export const mapDispatchToProps = dispatch => ({
  flagUserHasFilledTypeform: uniqId => {
    const config = {
      apiPath: '/users/current',
      body: {
        culturalSurveyId: uniqId,
        needsToFillCulturalSurvey: false,
      },
      isMergingDatum: true,
      method: 'PATCH',
    }
    dispatch(requestData(config))
  },
})

export default compose(
  withRedirectToSigninOrTypeformAfterLogin,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TypeForm)

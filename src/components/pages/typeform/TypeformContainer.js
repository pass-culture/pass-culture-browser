import { compose } from 'redux'
import { connect } from 'react-redux'
import { requestData } from 'redux-thunk-data'

import Typeform from './Typeform'
import { withRouter } from 'react-router-dom'
import withRequiredLogin from '../../hocs/with-login/withRequiredLogin'
import moment from 'moment'
import withPageTracking from '../../../tracking/withPageTracking'

export const mapDispatchToProps = dispatch => ({
  flagUserHasFilledTypeform: (id, handleRequestSuccess) => {
    const todayInUtc = moment()
      .utc()
      .format()

    dispatch(
      requestData({
        apiPath: '/users/current',
        body: {
          culturalSurveyId: id,
          culturalSurveyFilledDate: todayInUtc,
          needsToFillCulturalSurvey: false,
        },
        isMergingDatum: true,
        method: 'PATCH',
        handleSuccess: handleRequestSuccess,
      })
    )
  },
})

export default compose(
  withRequiredLogin,
  withPageTracking,
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(Typeform)

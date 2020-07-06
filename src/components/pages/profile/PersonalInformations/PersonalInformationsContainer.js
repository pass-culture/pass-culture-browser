import { connect } from 'react-redux'

import { updateUser } from '../repository/updateUser'
import PersonalInformations from './PersonalInformations'
import { compose } from 'redux'
import withPageTracking from '../../../../tracking/withPageTracking'

const mapDispatchToProps = dispatch => ({
  handleSubmit: (formValues, handleSubmitFail, handleSubmitSuccess) => {
    dispatch(updateUser(formValues, handleSubmitFail, handleSubmitSuccess))
  },
})

export default compose(
  withPageTracking,
  connect(
    null,
    mapDispatchToProps
  )
)(PersonalInformations)

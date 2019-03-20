import { connect } from 'react-redux'
import { selectCurrentUser } from 'with-login'

function mapStateToProps(state) {
  return {
    currentUser: selectCurrentUser(state),
  }
}

export const withCurrentUser = connect(mapStateToProps)

export default withCurrentUser

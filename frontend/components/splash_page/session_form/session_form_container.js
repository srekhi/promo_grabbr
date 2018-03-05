import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { login, logout, signup, clearErrors } from '../../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, { match }) => ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.session.errors,
});

const mapDispatchToProps = (dispatch, { location }) => {
  return {
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
//import { login, logout, signup, clearErrors } from '../../../actions/session_actions';
import GoogleAuth from './google';

const mapStateToProps = (state) => ({
  clientId: state.clientId,
  scopes: state.scopes
});

const mapDispatchToProps = (dispatch) => {
  return null;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoogleAuth));

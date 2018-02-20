import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { googleLogin } from '../../actions/auth_actions';
import GoogleAuth from './google';

const mapStateToProps = (state) => ({
  clientId: state.auth.clientId,
  scopes: state.auth.scopes
});

const mapDispatchToProps = (dispatch) => {
  return {
    googleLogin: authCode => dispatch(googleLogin(authCode))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);

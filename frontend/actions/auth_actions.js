import * as AuthApi from '../util/auth_api';
import * as SessionApi from '../util/session_api';
import * as SessionActions from './session_actions';

export const googleLogin = code => dispatch => (
    AuthApi.googleAuth(code).then(res => {
        localStorage.setItem('token', res.key);
        SessionApi.getCurrentUser().then(user => {
            dispatch(SessionActions.receiveCurrentUser(user));
        });
    }, err => {
        console.log(err);
    })
  );

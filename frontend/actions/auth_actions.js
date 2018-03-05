import * as AuthApi from '../util/auth_api';
import getCurrentUser from '../util/session_api';
import receiveCurrentUser from './session_actions';

export const googleLogin = code => dispatch => (
    AuthApi.googleAuth(code).then(res => {
        localStorage.setItem('token', res.key);
        getCurrentUser().then(res => {
            dispatch(receiveCurrentUser(res));
        });
    }, err => {
        console.log(err);
    })
  );

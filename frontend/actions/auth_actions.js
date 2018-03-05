import * as APIUtil from '../util/auth_api';

export const googleLogin = code => dispatch => (
    APIUtil.googleAuth(code).then(res => {
        localStorage.setItem('token', res.key);
    }, err => {
        console.log(err);
    })
  );

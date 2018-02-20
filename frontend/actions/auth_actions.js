import * as APIUtil from '../util/auth_api';

export const googleLogin = code => dispatch => (
    APIUtil.googleAuth(code).then(res => {
        console.log(res);
        localStorage.setItem('token', res.key);
    }, err => {
        console.log(err);
    })
  );
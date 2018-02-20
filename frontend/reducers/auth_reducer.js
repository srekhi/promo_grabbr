import merge from 'lodash/merge';

import {
    RECEIVE_AUTH_CODE
} from '../actions/auth_actions';

const defaultState = Object.freeze({
    clientId: '1046169933414-6mfd4o46adn4lcdmk79mue74h8ca3ou9.apps.googleusercontent.com',
    scopes: 'profile email https://www.googleapis.com/auth/gmail.readonly',
    authCode: ''
});

const AuthReducer = (state = defaultState, action) => {
    switch(action.type) {
        case RECEIVE_AUTH_CODE:
            return Object.assign({}, state, {
                authCode: action.authCode
            })
      default:
        return state;
    }
  };

  export default AuthReducer;

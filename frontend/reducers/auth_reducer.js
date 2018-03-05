import merge from 'lodash/merge';

const defaultState = Object.freeze({
    clientId: '1046169933414-6mfd4o46adn4lcdmk79mue74h8ca3ou9.apps.googleusercontent.com',
    scopes: 'profile email https://www.googleapis.com/auth/gmail.readonly',
});

const AuthReducer = (state = defaultState, action) => {
        return state;
    };

export default AuthReducer;

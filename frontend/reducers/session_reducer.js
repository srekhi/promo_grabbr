import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS,
  REMOVE_SESSION_ERRORS,
  RECEIVE_COMPANIES,
  RECEIVE_COMPANY,
  REMOVE_COMPANIES
} from '../actions/session_actions';

const defaultState = Object.freeze({
  currentUser: null,
  errors: [],
  companies: []
});

const SessionReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return merge({}, state, {
        currentUser
      });
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return merge({}, state, {
        errors
      });
    case REMOVE_SESSION_ERRORS:
      newState = merge({}, state);
      newState['errors'] = [];
      return newState;

    default:
      return state;
  }
};

export default SessionReducer;

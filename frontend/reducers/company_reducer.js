import merge from 'lodash/merge';

import {
  RECEIVE_COMPANIES,
  RECEIEVE_COMPANY,
  RECEIVE_COMPANY_ERRORS,
  CLEAR_COMPANY_ERRORS,
  CLEAR_COMPANIES,
} from '../actions/company_actions';

const CompanyReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_COMPANIES:
        return action.companies;
    case RECEIVE_COMPANY:
      company = action.company
      newState = merge({}, state);
      if (!newState[company.id]){
        newState[company.id].push(company);
      }
      return newState;
    case RECEIVE_COMPANY_ERRORS:
      newState['errors'] = action.errors;
      return newState;
    case CLEAR_COMPANY_ERRORS:
      newState['errors'] = [];
      return newState;
    case CLEAR_COMPANIES:
      newState.companies = [];
      return newState;
    default:
      return state;
  }
};
import merge from 'lodash/merge';

import {
  RECEIVE_COMPANIES,
  RECEIEVE_COMPANY,
  CLEAR_COMPANIES,
} from '../actions/company_actions';

const defaultState = { };

const CompanyReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_COMPANIES:
        newState = merge({}, state);
        newState = action.companies;
        return newState;
    case RECEIVE_COMPANY:
      company = action.company
      newState = merge({}, state);
      if (!newState[company.id]){
        newState[company.id].push(company);
      }
      return newState;
    case CLEAR_COMPANIES:
      newState.companies = [];
      return newState;
    default:
      return state;
  }
};
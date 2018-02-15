import { combineReducers } from 'redux';
import CompanyReducer from './company_reducer';
import SessionReducer from './session_reducer';

const AppReducer = combineReducers({
  companies: CompanyReducer,
  session: SessionReducer
});

const RootReducer = (state, action) => {
  if (action.type === "RECEIVE_CURRENT_USER" && action.currentUser === null){
    state = undefined;
  }
  return AppReducer(state, action);
};

export default RootReducer;

import { connect } from 'react-redux';
import { fetchCompanies } from '../../../../actions/company_actions';

import CompanySelection from './company_selection';

const mapStateToProps = (state) => ({
  companies: state.companies
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompanies: (userId) => dispatch(fetchChannels(userId)),
  // addCompany: (userId) => dispatch(fetchNotifications(userId))
});


export default connect(mapStateToProps, mapDispatchToProps)(CompanySelection);

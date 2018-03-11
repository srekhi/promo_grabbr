import { connect } from 'react-redux';
import { fetchCompanies, addCompany } from '../../../actions/company_actions';

import CompanySelection from './company_selection';

const mapStateToProps = (state) => ({
  companies: state.companies,
  // userId: state.currentUser.id - add back in once bxu does the FE part of oauth.
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompanies: () => dispatch(fetchCompanies()),
  addCompany: (userId) => dispatch(addCompany(userId, companyId))
});


export default connect(mapStateToProps, mapDispatchToProps)(CompanySelection);

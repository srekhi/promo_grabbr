import { connect } from 'react-redux';
import { fetchCompanies, addCompany } from '../../../actions/company_actions';

import CompanySelection from './company_selection';

const mapStateToProps = (state) => ({
  companies: state.companies
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompanies: (userId) => dispatch(fetchCompanies(userId)),
  addCompany: (userId) => dispatch(addCompany(userId, companyId))
});


export default connect(mapStateToProps, mapDispatchToProps)(CompanySelection);

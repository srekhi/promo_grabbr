import { connect } from 'react-redux';
import { fetchCompanies } from '../../../actions/company_actions';

import CompanyList from './company_list';

const mapStateToProps = (state) => ({
	currentUserId: state.session.currentUser.id,
	companies: state.companies
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompanies: (userId) => dispatch(fetchChannels(userId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CompanyList);

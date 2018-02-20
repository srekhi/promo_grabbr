import React from 'react';
import Modal from 'react-modal';
import CompanyListItem from './company_list_item';

class CompanyList extends React.Component {
  // modify this logic from channel -> company
  constructor(props) {
    super(props);
  }

  componentWillMount(){
  	const userId = this.props.currentUserId;
  	this.props.fetchCompanies(userId);
  }

  render(){
    if (this.props.companies === undefined || this.props.currentUser === undefined) return <p>Loading..</p>;
    const companyList = this.props.companies.map((company) => <CompanyListItem company={company} />);
    return (
	<ul>
		{companyList} 
	</ul>
    );
  }
}

export default CompanyList;
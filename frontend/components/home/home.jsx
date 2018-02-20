// create home jsx`
import React from 'react';
import CompanyListContainer from './company_list/company_list_container';
import CompanySelectionContainer from './company_selection/company_selection_container';

const Home = () => (
	<main>
		<CompanyListContainer />
		<CompanySelectionContainer />
	</main>
);


export default Home;
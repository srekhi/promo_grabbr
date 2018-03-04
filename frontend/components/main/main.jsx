import React from 'react';
import CompanySelection from './company_selection/company_selection_container';
class Main extends React.Component {
  // modify this logic from channel -> company
  constructor(props){
    super(props);
  }

  render(){
    return <CompanySelection />
  }
}

export default Main;

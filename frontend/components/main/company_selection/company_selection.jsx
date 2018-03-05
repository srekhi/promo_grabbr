import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './company_selection.css';
import { fa, fa_times_circle_o } from '../../icons/icons';
const COMPANY_LIST = [ // temporarily, will eventually be this.props.allCompanies
        { name: 'Postmates' }, 
        { name: 'Uber Eats' }, 
        { name: 'Doordash' }, 
        { name: 'Uber' } , 
        { name: 'Lyft' }
]
class CompanySelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      searchText: '',
      selectedCompanies: [], // TODO (Sunny): Replace this with this.props.userCompanies when fetch API call is written.
      filteredCompanies: [], // when user types in a company name, we filter out company list for search purpose. will also initialize to this.props.userCompanies.
      clicked: false,
    };
    this.addCompanies = this.addCompanies.bind(this);
    this.selectCompany = this.selectCompany.bind(this);
    this.deselectCompany = this.deselectCompany.bind(this);
    this.userId = this.props.userId;
  }

  componentDidMount() {
    // this.props.fetchCompanies();
    // when we have api call set up ^ call the above.
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  selectCompany(company) {
    if (!this.state.selectedCompanies.includes(company)) {
      const currentSelectedCompanies = this.state.selectedCompanies;
      currentSelectedCompanies.push(company);
      this.setState({selectedCompanies: currentSelectedCompanies});
    }
  }

  deselectCompany(company) {
    const i = this.state.selectedCompanies.indexOf(company);
    const newSelectedCompanies = this.state.selectedCompanies.slice(0, i).concat(this.state.selectedCompanies.slice(i+1));
    this.setState({selectedCompanies: newSelectedCompanies});
  }

  addCompanies(e) {
    e.preventDefault();
    this.state.selectedCompanies.forEach((company) => {
      if (!this.props.userCompanies.includes(company)) {
        this.props.addCompany(this.userId, company.id);
      }
    });

    this.setState({ clicked: true} );
  }

  render() {
    const self = this;
    let selectedCompanies = this.state.selectedCompanies.map((selectedCompany) => (
      <li className="selected-company">
        {selectedCompany.name}
        <i id="delete-selected-company" className='fa fa-times-circle-o' aria-hidden="true" onClick={() => self.deselectCompany(selectedCompany)}></i>
      </li>
    ));

    // when API call written out, COMPANY_LIST will be this.props.allCompanies
    const filteredCompanyList = COMPANY_LIST.map((company) => {
        if (company.name.toLowerCase().startsWith(this.state.searchText.toLowerCase())) {
          return <li onClick={() => this.selectCompany(company)} className='new-company-list-item'>{company.name}</li>
        }
    });

    if (this.state.clicked) {
      const btn = <button onClick={this.addCompanies} id="new-company-button" type="submit" value="Submit">Submit</button>
    } else {
      const btn = <button id="new-company-button" type="submit" value="Submit">Submitted!</button>
    }

    const submittedText = "Recorded! We'll scan for deals from these companies in your inbox. If we find useful deals, we'll send them to your inbox.";
    // have some boolean that renders a success message if they click the submit button. don't close out of anything though.
    // this selection page is basically the entire home page for now.
    return (
        <div id="new-company-window">
          <div className='header-text'>We'll send you direct emails when the companies you select have sent you massive, short-lived deals.
           No more digging through your spam to find great deals.</div>
          <form className="company-form">
              <div id="wrap-name-and-button">
              <input type="text"
                id="new-company-add-companies-input"
                value={this.state.searchText}
                onChange={this.update('searchText')}
                className="new-company-input"
                placeholder="Filter by company name"
              />
              <button onClick={this.addCompanies} id="new-company-button" type="submit" value="Submit">Submit</button>
            </div>
            <section id="selected-companies">
              <ul id="selected-company-list">
                { selectedCompanies }
              </ul>
            </section>
            <ul id="new-company-form-list">
              { filteredCompanyList }
            </ul>
          </form>
          <div className='footer-text'>{submittedText}</div>
        </div>
    );
  }
}
export default withRouter(CompanySelection);
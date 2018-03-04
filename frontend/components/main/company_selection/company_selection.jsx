import React from 'react';
// import AlertContainer from 'react-alert';
import { withRouter } from 'react-router-dom';
// import Spinner from '../../../spinner';
import styles from './company_selection.css';

class CompanySelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      selectedCompanies: [] // TODO (Sunny): Replace this with this.props.companies when fetch API call is written.
    };
    this.renderErrors = this.renderErrors.bind(this);
    this.addCompany = this.addCompany.bind(this);
    this.alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };


    this.selectCompany = this.selectCompany.bind(this);
    this.deselectCompany = this.deselectCompany.bind(this);
  }

  componentDidMount() {
    // this.props.fetchCompanies();
    // when we have api call set up ^
  }
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }
  componentWillUnmount(){
    // make the POST request here?
  }

  selectCompany(company) {
    if (!this.state.selectedCompanies.includes(company)) {
      let currentSelectedCompanies = this.state.selectedCompanies;
      currentSelectedCompanies.push(company);
      this.setState({selectedCompanies: currentSelectedCompanies});
    }
  }

  deselectCompany(company) {
    event.preventDefault();
    let i = this.state.selectedCompanies.indexOf(company);
    let newSelectedCompanies = this.state.selectedCompanies.slice(0, i).concat(this.state.selectedCompanies.slice(i+1));
    this.setState({selectedCompanies: newSelectedCompanies});
  }

  addCompanies(e) {
    e.preventDefault();
    if (!this.state.selectedCompanies.includes(this.props.currentUser)){
      this.state.selectedCompanies.push(this.props.currentUser);
    }
    if (this.props.name !== undefined) { this.state.name = this.props.name; }

    let company = this.state;
    company['user_ids'] = this.state.selectedCompanies.map(company => company.id);
    this.props.addCompany(company).then( res => {
      if (res.company !== undefined) {
        this.props.fetchCompanies(this.props.currentUser.id);
        this.props.history.push(`/messages/${res.company.id}`);
        this.props.removeErrors();
      }
    });
  }

  renderErrors() {
    let error_exclamation = "";
    if (this.props.errors === undefined) return 'Loading...';
    if (this.props.errors.length > 0){
      error_exclamation = <i className="fa fa-exclamation" aria-hidden="true"></i>;
    }
    return(
      <section className="errors-new-company">
        <ul className="error-list-new-company">
          <li id="new-company-error-fa">{error_exclamation}</li>
          {this.props.errors.map((error, i) => (
            <li id="new-company-error" className="create-company-error"  key={`error-${i}`}>
                {error}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  render() {
    let header;
    const self = this;
    let selectedCompanies = this.state.selectedCompanies.map((selectedCompany) => (
      <li className="selected-company">
         // <img /> use logo of company here.
        {selectedCompany.name}
        <i id="delete-selected-company" className="fa fa-times-circle-o" aria-hidden="true" onClick={() => self.deselectCompany(selectedCompany)}></i>
      </li>
    ));

    // eventually, this will say this.props.allCompanies
    const allCompanies = [];
    let filteredCompanies = allCompanies.filter(
      (company) => {
        return company.name.indexOf(this.state.allCompanies) !== -1;
      }
    );
    // if (this.props.allCompanies === undefined) return <p>Loading...</p>; - eventually.

    let companyList = filteredCompanies.map((company) => {
      return(
        <li onClick={() => this.selectCompany(company)} className="new-company-list-item">
          <img id="company-dropdown-logo" alt="avatar" />
          {company.name}
        </li>
    );
    });
    return (
      <div id="new-company-window">
        <form className="company-form">
          {this.renderErrors()}
          <h1>{header}</h1>
            <div id="wrap-name-and-button">
            <input type="text"
              id="new-company-add-Companies-input"
              value={this.state.allCompanies}
              onChange={this.update('allCompanies')}
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
          <ul id="new-company-form-list" >
            {companyList}
          </ul>
        </form>
      </div>
    );
  }
}
export default withRouter(CompanySelection);
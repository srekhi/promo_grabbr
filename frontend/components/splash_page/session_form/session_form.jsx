import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import faker from 'faker';
import styles from './session_form.css'
import AuthGoogleContainer from '../../auth/google_container';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
}
  componentWillUnmount(){
    this.props.clearErrors();
  }

  renderErrors() {
    let error_exclamation = "";
    if (this.props.errors.length > 0){
      error_exclamation = <i id="splash-page-error-fa" className="fa fa-exclamation" aria-hidden="true"></i>;
    }
    return(
      <section className="errors">
        <ul className="error-list">
          <li>{error_exclamation}</li>
          {this.props.errors.map((error, i) => (
            <li id="db-error-splash" key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  render() {
    return (
        <div id="login-window">
          <form className="session-form">
            <AuthGoogleContainer />
            <small className='assurance'>We won't store any of your emails on our servers & we'll only scrape emails from the companies you let us.</small>
            {this.renderErrors()}
          </form>
        </div>
    );
  }
}

export default withRouter(SessionForm);

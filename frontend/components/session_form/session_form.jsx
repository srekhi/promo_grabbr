import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import faker from 'faker';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      modalOpen: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
    this.generateRandomUsername = this.generateRandomUsername.bind(this);
    this.generateRandomPassword = this.generateRandomPassword.bind(this);
}
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;
    this.props.processForm(user);
  }

  clearState() {
    this.setState({username: "", password: ""});
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
å    return (
        <div id="login-window">
          <form className="session-form" onSubmit={this.handleSubmit}>
            <h1> {capitalizedFormType} </h1>
            <p>Enter your <b>username</b> and <b>password</b></p>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
              />
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
              <button className="login-button" type="submit" value="Submit">{capitalizedFormType}</button>
              <p id="demo-login">{this.navLink()}</p>
              {this.renderErrors()}
          </form>
        </div>
    );
  }
}

export default withRouter(SessionForm);

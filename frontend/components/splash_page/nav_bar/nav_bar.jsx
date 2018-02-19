import React from 'react';
import { Link, withRouter }  from 'react-router-dom';
import { Redirect } from 'react-router';
import faker from 'faker';


class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    if (e.target.id === "login") {
      this.props.history.push("/login");
    } else if (e.target.id === "sign-up") {
      this.props.history.push("/signup");
    } else if (e.target.id === "splat-logo") {
      this.props.history.push("/");
    }
  }
  render(){
    return (
      <nav className="landing-page-nav">
        <section id="logo-container">
          <Link id="landing-page-logo-link" to="/">PromoGrabbr</Link>
          <p id="tagline">Don't miss a deal again.</p>
        </section>
        <section id="session-control-container">
          <button onClick={this.handleClick} id="login">Log in</button>
          <button onClick={this.handleClick} id="sign-up">Sign up</button>
        </section>
      </nav>
    );
  }
}

export default Navbar;

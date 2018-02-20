import React from 'react';
import { Link, withRouter }  from 'react-router-dom';
import { Redirect } from 'react-router';
import faker from 'faker';
import styles from './nav_bar.css'

class Navbar extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <nav className="landing-page-nav">
        <section id="logo-container">
          <Link id="landing-page-logo-link" to="/">PromoGrabbr</Link>
          <p id="tagline">Don't miss a deal again.</p>
        </section>
        <section id="logo-container">
          <p id="about-us">How does this work?</p>
        </section>
      </nav>
    );
  }
}

export default Navbar;

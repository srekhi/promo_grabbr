import NavbarComponent from './nav_bar/nav_bar_component';
import SessionFormContainer from './session_form/session_form_container';
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import IntroText from './intro_text.jsx';
import styles from './splash_page.css';

const SplashPage = () => (
  <main>
    <NavbarComponent />
    <div className='splash-page-intro'>
	    <IntroText />
	    <SessionFormContainer />
	</div>
  </main>
);

export default SplashPage;

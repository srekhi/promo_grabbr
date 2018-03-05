import React from 'react';
import { Switch, Route } from 'react-router';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
// import HomeContainer from './home/home_container.jsx';
import SplashPage from './splash_page/splash_page';
// import Spinner from './spinner.jsx';
import Main from './main/main';
import './index.css'

const App = () => (
    <div>
        <Switch>
          {/*<ProtectedRoute exact path="/" component={HomeContainer} />*/}
          {/*<ProtectedRoute path="/messages/:messageId" component={HomeContainer} />*/}
          <Route component={SplashPage} />
          {/*<Main />*/}
        </Switch>
    </div>
);

export default App;

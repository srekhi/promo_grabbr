import React from 'react';
import { Switch, Route } from 'react-router';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Home from './home/home';
import SplashPage from './splash_page/splash_page';
// import Spinner from './spinner.jsx';
import './index.css'

const App = () => (
    <div>
        <Switch>
          <Route exact path="/" component={Home} />
          {/*<ProtectedRoute path="/messages/:messageId" component={HomeContainer} />*/}
          <Route component={SplashPage} />
        </Switch>
    </div>
);

export default App;

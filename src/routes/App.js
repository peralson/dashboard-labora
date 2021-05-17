// React
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Containers
import Offers from '../containers/Offers';
import Workers from '../containers/Workers';
import Manage from '../containers/Manage';
import Company from '../containers/Company';
import NotFound from '../containers/NotFound';

// Components
import Top from '../components/main/Top';
import Menu from '../components/main/Menu';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Top>
        {/* Logs into App */}

        <Menu>
          {/* Main Containers */}
          <Route exact path={['/', '/ofertas']} component={Offers} />
          <Route exact path="/trabajadores" component={Workers} />
          <Route exact path="/gestion" component={Manage} />
          <Route exact path="/empresa" component={Company} />

          {/* Other routes */}
          <Route component={NotFound} />
        </Menu>
      </Top>
    </Switch>
  </BrowserRouter>
);

export default App;

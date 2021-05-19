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
import PageGrid from '../components/main/PageGrid';

const App = () => (
  <BrowserRouter>
    <Switch>
      {/* Logs into App */}
      <PageGrid>
        {/* Main Containers */}
        <Route exact path={['/', '/ofertas']} component={Offers} />
        <Route exact path="/trabajadores" component={Workers} />
        <Route exact path="/gestion" component={Manage} />
        <Route exact path="/empresa" component={Company} />
      </PageGrid>
      {/* Other routes */}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;

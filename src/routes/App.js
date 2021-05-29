// React
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Containers
import Offers from '../containers/Offers';
import Offer from "../containers/OneOffer";
import Project from "../containers/OneProject";
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
          <Route exact path={["/", "/ofertas"]} component={Offers} /> 
          <Route exact path={"/ofertas/o/:id"} component={Offer} />
          <Route exact path={"/ofertas/p/:id"} component={Project} />
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

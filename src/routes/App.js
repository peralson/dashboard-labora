// React
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Containers
import Offers from '../containers/Offers';
import Offer from "../containers/OneOffer";
import Project from "../containers/OneProject";
import NewProject from "../containers/new/NewProject";
import NewProjectOffer from "../containers/new/NewProjectOffer";
import NewOffer from "../containers/new/NewOffer";
import Workers from '../containers/Workers';
import Manage from '../containers/Manage';
import EditOffer from '../containers/edit/EditOffer';
import EditSingleOffer from "../containers/edit/EditSingleOffer";
import EditProject from "../containers/edit/EditProject";
import Company from '../containers/Company';
import ManageOffer from '../containers/ManageOffer';
import NotFound from '../containers/NotFound';
import NewWorker from '../containers/NewWorker';

// Components
import PageGrid from '../components/main/PageGrid';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Logs into App */}
        <Route exact path={"/registro/:id"} component={NewWorker} />
        <PageGrid>
          {/* Main Containers */}
          <Route exact path={["/", "/ofertas"]} component={Offers} />
          <Route exact path={"/ofertas/nueva-oferta"} component={NewOffer} />
          <Route
            exact
            path={"/ofertas/nuevo-proyecto"}
            component={NewProject}
          />
          <Route exact path={"/ofertas/o/:id"} component={Offer} />
          <Route exact path={"/ofertas/o/edit/:id"} component={EditOffer} />
          <Route
            exact
            path={"/ofertas/o/edit-single/:id"}
            component={EditSingleOffer}
          />
          <Route exact path={"/ofertas/p/:id"} component={Project} />
          <Route exact path={"/ofertas/p/edit/:id"} component={EditProject} />
          <Route
            exact
            path={"/ofertas/p/:id/nueva-oferta"}
            component={NewProjectOffer}
          />
          <Route exact path={"/trabajadores"} component={Workers} />
          <Route exact path={"/gestion"} component={Manage} />
          <Route exact path={"/gestion/o/:id"} component={ManageOffer} />
          <Route exact path="/empresa" component={Company} />
        </PageGrid>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

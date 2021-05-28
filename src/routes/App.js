// React
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Containers
import Offers from '../containers/Offers';
import Offer from "../containers/OneOffer";
import Project from "../containers/OneProject";
import Workers from '../containers/Workers';
import Manage from '../containers/Manage';
import Company from '../containers/Company';
import NotFound from '../containers/NotFound';

// Contexts
import { SelectedItem, SelectedItemIndie, SelectedWorker } from '../context/SelectedItemContext'

// Components
import PageGrid from '../components/main/PageGrid';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [selectedItemIndie, setSelectedItemIndie] = useState(null)
  
  return (
    <BrowserRouter>
      <Switch>
        {/* Logs into App */}
        <PageGrid>
          {/* Main Containers */}
          <SelectedItem.Provider value={{ selectedItem, setSelectedItem }}>
            <Route exact path={["/", "/ofertas"]} component={Offers} />
          </SelectedItem.Provider>
          <SelectedItemIndie.Provider value={{ selectedItemIndie, setSelectedItemIndie }}>
            <Route exact path={"/ofertas/o/:id"} component={Offer} /> 
          </SelectedItemIndie.Provider>
          <Route exact path={"/ofertas/p/:id"} component={Project} />
          <SelectedWorker.Provider value={{ selectedWorker, setSelectedWorker }}>
            <Route exact path="/trabajadores" component={Workers} />
          </SelectedWorker.Provider>
          <Route exact path="/gestion" component={Manage} />
          <Route exact path="/empresa" component={Company} />
        </PageGrid>
        {/* Other routes */}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

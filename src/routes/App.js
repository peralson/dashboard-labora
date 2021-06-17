// React
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Context
import { AuthProvider } from "../context/AuthContext";

// Containers
import Offers from "../containers/Offers";
import Offer from "../containers/OneOffer";
import Project from "../containers/OneProject";
import NewProject from "../containers/new/NewProject";
import NewProjectOffer from "../containers/new/NewProjectOffer";
import NewOffer from "../containers/new/NewOffer";
import Workers from "../containers/Workers";
import Manage from "../containers/Manage";
import EditOffer from "../containers/edit/EditOffer";
import EditSingleOffer from "../containers/edit/EditSingleOffer";
import EditProject from "../containers/edit/EditProject";
import Company from "../containers/Company";
import ManageOffer from "../containers/ManageOffer";
import NotFound from "../containers/NotFound";
import NewWorker from "../containers/NewWorker";
import Login from "../containers/Login";
import ResetPassword from "../containers/ResetPassword";
<<<<<<< HEAD
import ProjectManagement from "../containers/ProjectManagement";
=======
import PastProject from "../containers/OnePastProject";
>>>>>>> d7543f67662212994430768df3ef1683705d712b

// Components
import PrivateRoute from "./PrivateRoute";

const App = () => {
<<<<<<< HEAD
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          {/* Logs into App */}
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/reset-password"} component={ResetPassword} />
          <Route exact path={"/registro/:id"} component={NewWorker} />
          <Route
            exact
            path={"/gestion-de-proyecto/:id"}
            component={ProjectManagement}
          />
=======
	return (
		<BrowserRouter>
			<AuthProvider>
				<Switch>
					{/* Logs into App */}
					<Route exact path={"/login"} component={Login} />
					<Route exact path={"/reset-password"} component={ResetPassword} />
					<Route exact path={"/registro/:id"} component={NewWorker} />
>>>>>>> d7543f67662212994430768df3ef1683705d712b

					{/* Main Containers */}
					<PrivateRoute exact path={["/", "/ofertas"]} component={Offers} />
					<PrivateRoute
						exact
						path={"/ofertas/nueva-oferta"}
						component={NewOffer}
					/>
					<PrivateRoute
						exact
						path={"/ofertas/nuevo-proyecto"}
						component={NewProject}
					/>
					<PrivateRoute exact path={"/ofertas/o/:id"} component={Offer} />
					<PrivateRoute
						exact
						path={"/ofertas/o/edit/:id"}
						component={EditOffer}
					/>
					<PrivateRoute
						exact
						path={"/ofertas/o/edit-single/:id"}
						component={EditSingleOffer}
					/>
					<PrivateRoute exact path={"/ofertas/p/:id"} component={Project} />
					<PrivateRoute
						exact
						path={"/ofertas/p/edit/:id"}
						component={EditProject}
					/>
					<PrivateRoute
						exact
						path={"/ofertas/p/:id/nueva-oferta"}
						component={NewProjectOffer}
					/>
					<PrivateRoute exact path={"/trabajadores"} component={Workers} />
					<PrivateRoute exact path={"/gestion"} component={Manage} />
					<PrivateRoute exact path={"/gestion/o/:id"} component={ManageOffer} />
					<PrivateRoute exact path={"/gestion/p/:id"} component={PastProject} />
					<PrivateRoute exact path="/empresa" component={Company} />

					{/* Other Routes */}
					<Route component={NotFound} />
				</Switch>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;

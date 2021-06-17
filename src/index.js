import React from 'react';
import ReactDOM from 'react-dom';

// Chakra
import { ChakraProvider } from "@chakra-ui/react";
import { brandTheme } from './styles/theme';

// Redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { firebaseReducer } from "react-redux-firebase";
import ReduxThunk from "redux-thunk";

// Reducers
import authReducer from "./store/reducers/auth";
import workersReducer from "./store/reducers/workers";
import projectsReducer from "./store/reducers/projects";
import contractsReducer from "./store/reducers/contracts";
import payrollsReducer from "./store/reducers/payrolls";
import templatesReducer from "./store/reducers/templates";
import tagsReducer from "./store/reducers/tags";
import categoriesReducer from "./store/reducers/categories";

// App
import App from './routes/App';

// Introducimos todos nuestros reducers en un global
const rootReducer = combineReducers({
  auth: authReducer,
  workers: workersReducer,
  projects: projectsReducer,
  contracts: contractsReducer,
  payrolls: payrollsReducer,
  templates: templatesReducer,
  tags: tagsReducer,
  categories: categoriesReducer,
  firebase: firebaseReducer,
});

// y agregamos nuestro reducer global al store de Redux
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

ReactDOM.render(
  <ChakraProvider theme={brandTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>,
  document.getElementById('root')
);
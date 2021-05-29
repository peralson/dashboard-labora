import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './routes/App';
import { brandTheme } from './styles/theme';
// Redux
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

// Reducers
import workersReducer from './store/reducers/workers'
import projectsReducer from './store/reducers/projects'
import contractsReducer from './store/reducers/contracts'
import payrollsReducer from './store/reducers/payrolls'
import templatesReducer from './store/reducers/templates'

// Introducimos todos nuestros reducers en un global
const rootReducer = combineReducers({
    workers: workersReducer,
    projects: projectsReducer,
    contracts: contractsReducer,
    payrolls: payrollsReducer,
    templates: templatesReducer,
})

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
import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './routes/App';
import { brandTheme } from './styles/theme';

ReactDOM.render(
  <ChakraProvider resetCSS theme={brandTheme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
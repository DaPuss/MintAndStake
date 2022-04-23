import React from 'react';
import StyledApp from './App';
import ReactDOM from 'react-dom';
import { Provider as WagmiProvider, defaultChains } from 'wagmi';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';
import { AccountProvider } from './context/AccountContext';
import { connectors, provider } from './utils/connectors';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <WagmiProvider /*autoConnect*/ provider={provider} connectors={connectors}>
          <AccountProvider>
            <StyledApp />
          </AccountProvider>
        </WagmiProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

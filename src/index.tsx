import React from 'react';
import ReactDOM from 'react-dom';

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import App from './App';
import AppStateProvider, { useAppState } from './state';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ErrorDialog from './components/ErrorDialog/ErrorDialog';
import LoginPage from './components/LoginPage/LoginPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import theme from './theme';
import './types';
import { ChatProvider } from './components/ChatProvider';
import { VideoProvider } from './components/VideoProvider';
import useConnectionOptions from './utils/useConnectionOptions/useConnectionOptions';
import UnsupportedBrowserWarning from './components/UnsupportedBrowserWarning/UnsupportedBrowserWarning';
import { AgentWalrus } from '@agent-walrus/agent-walrus';

const VideoApp = () => {
  const { error, setError } = useAppState();
  const connectionOptions = useConnectionOptions();
  const AW_APP_ID = window.location.hostname.split('.')[0];
  const AW_GATEWAY_URL = process.env.REACT_APP_AW_GATEWAY_URL;

  if (AW_APP_ID) {
    console.log('Initializing AgentWalrus with APP_ID: ', AW_APP_ID, 'GATEWAY_URL', AW_GATEWAY_URL);
    AgentWalrus.init(AW_APP_ID, { gatewayUrl: AW_GATEWAY_URL });
  } else {
    console.log('Agent Walrus not initialized.');
  }

  return (
    <VideoProvider options={connectionOptions} onError={setError}>
      <ErrorDialog dismissError={() => setError(null)} error={error} />
      <ChatProvider>
        <App />
      </ChatProvider>
    </VideoProvider>
  );
};

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <UnsupportedBrowserWarning>
      <Router>
        <AppStateProvider>
          <Switch>
            <PrivateRoute exact path="/">
              <VideoApp />
            </PrivateRoute>
            <PrivateRoute path="/room/:URLRoomName">
              <VideoApp />
            </PrivateRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Redirect to="/" />
          </Switch>
        </AppStateProvider>
      </Router>
    </UnsupportedBrowserWarning>
  </MuiThemeProvider>,
  document.getElementById('root')
);

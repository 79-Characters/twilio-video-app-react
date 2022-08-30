import React from 'react';
import ReactDOM from 'react-dom';

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import App from './App';
import AppStateProvider, { useAppState } from './state';
import { HashRouter as Router, Route, Switch, useParams } from 'react-router-dom';
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
  const { token } = useParams();
  const AW_GATEWAY_URL = process.env.REACT_APP_AW_GATEWAY_URL;

  if (token) {
    console.log('Initializing AgentWalrus with token: ', token, 'gatewayUrl', AW_GATEWAY_URL);
    AgentWalrus.init(token, { gatewayUrl: AW_GATEWAY_URL });
    (window as any).AW = AgentWalrus;
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
            <PrivateRoute exact path="/:token">
              <VideoApp />
            </PrivateRoute>
            <PrivateRoute path="/:token/room/:URLRoomName">
              <VideoApp />
            </PrivateRoute>
            <Route path="/:token/login">
              <LoginPage />
            </Route>
          </Switch>
        </AppStateProvider>
      </Router>
    </UnsupportedBrowserWarning>
  </MuiThemeProvider>,
  document.getElementById('root')
);

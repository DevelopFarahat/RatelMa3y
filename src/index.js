import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import "./utils/i18n";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "./utils/UserContext";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
  <SnackbarProvider maxSnack={3} dense variant="error"
  autoHideDuration={2000} anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}>
    <Router>
      <App />
      
    </Router>
  </SnackbarProvider>
  </UserProvider>
);

serviceWorkerRegistration.register();
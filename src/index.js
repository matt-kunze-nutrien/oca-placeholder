import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AUTH0_AUDIENCE } from "./constants";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="auth.dev.nutrienagsolutions.com"
      clientId="QMIEi2ktFjxx6VGPUUjgNyZ7f3iGQPmH"
      redirectUri={window.location.origin}
      audience={AUTH0_AUDIENCE}
      scope="profile"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import jwtDecode from "jwt-decode";
import "./App.css";

import { CP_AUDIENCE, DIGITAL_AUDIENCE } from "./constants";

function App() {
  const {
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  const [apiToken, setApiToken] = useState(null);
  useEffect(() => {
    if (isAuthenticated && !apiToken) {
      getAccessTokenSilently()
        .then(setApiToken)
        .catch((err) => console.error(err));
    }
  }, [apiToken, isAuthenticated, getAccessTokenSilently]);

  const [cpToken, setCpToken] = useState(null);
  useEffect(() => {
    if (isAuthenticated && !cpToken) {
      getAccessTokenSilently({
        audience: CP_AUDIENCE,
      })
        .then(setCpToken)
        .catch((err) => console.error(err));
    }
  }, [cpToken, isAuthenticated, getAccessTokenSilently]);

  const [digitalToken, setDigitalToken] = useState(null);
  useEffect(() => {
    if (isAuthenticated && !digitalToken) {
      getAccessTokenSilently({
        audience: DIGITAL_AUDIENCE,
      })
        .then(setDigitalToken)
        .catch((err) => console.error(err));
    }
  }, [digitalToken, isAuthenticated, getAccessTokenSilently]);

  console.info({ apiToken, cpToken, digitalToken });
  return (
    <div className="App">
      <header className="App-header">
        <h1>OCA Placeholder Application</h1>
        <h3>User</h3>
        <pre className="App-detail">{JSON.stringify(user, null, "  ")}</pre>
        <h3>API Token</h3>
        <pre className="App-detail">
          {JSON.stringify(apiToken ? jwtDecode(apiToken) : null, null, "  ")}
        </pre>
        <h3>Digital Token</h3>
        <pre className="App-detail">
          {JSON.stringify(
            digitalToken ? jwtDecode(digitalToken) : null,
            null,
            "  "
          )}
        </pre>
        <h3>CP Token</h3>
        <pre className="App-detail">
          {JSON.stringify(cpToken ? jwtDecode(cpToken) : null, null, "  ")}
        </pre>
        <button onClick={logout}>Sign out</button>
      </header>
    </div>
  );
}

export default App;

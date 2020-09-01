import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import jwtDecode from "jwt-decode";
import "./App.css";

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

  const [cxhToken, setCxhToken] = useState(null);
  useEffect(() => {
    if (isAuthenticated && !cxhToken) {
      getAccessTokenSilently({
        audience: "https://cxh-api.dev.cps-core.com/",
      })
        .then(setCxhToken)
        .catch((err) => console.error(err));
    }
  }, [cxhToken, isAuthenticated, getAccessTokenSilently]);

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
        <h3>CXH Token</h3>
        <pre className="App-detail">
          {JSON.stringify(cxhToken ? jwtDecode(cxhToken) : null, null, "  ")}
        </pre>
        <button onClick={logout}>Sign out</button>
      </header>
    </div>
  );
}

export default App;

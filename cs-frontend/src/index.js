import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Keycloak from 'keycloak-js';

let keycloakOptions = {
  "realm": "Consolidated-Server",
  "url": "https://host.openelis.org:8446/auth",
  clientId: 'data-import',
  "ssl-required": "true",
};
//Get the keycloak configuration
let keycloak = Keycloak(keycloakOptions);

//Initialization of the keycloak instance
keycloak.init({ onLoad: 'login-required' }).success((authenticated) => {

  if (!authenticated) {
    window.location.reload();
  } else {
    console.info("Authenticated");
  }


  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );

  localStorage.setItem("react-token", keycloak.token);
  localStorage.setItem("react-refresh-token", keycloak.refreshToken);

  setTimeout(() => {
    keycloak.updateToken(70).success((refreshed) => {
      if (refreshed) {
        console.debug('Token refreshed' + refreshed);
      } else {
        console.warn('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).error(() => {
      console.error('Failed to refresh token');
    });


  }, 60000)

}).error(() => {
  console.error("Authenticated Failed");
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
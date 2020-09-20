import React from "react";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import { Router, Route } from "react-router-dom";

import { createBrowserHistory } from "history";

// Common modules
import AuthorizedApolloProvider from "./common/apollo";

// Pages
import DefaultLayout from "./layouts/default";
import HomePage from "./pages/Homepage";
import NotesPage from "./pages/NotesPage";

import "./App.css";

export const history = createBrowserHistory();
const ProtectedRoute = ({ component, ...args }: any) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);
const PublicRoute = ({ component, ...args }: any) => (
  <Route component={component} {...args} />
);

const onRedirectCallback = (appState: any) => {
  // Use the router's history module to replace the url
  console.log(appState);
  history.replace(appState.returnTo || window.location.pathname);
};

function App() {
  return (
    // <Auth0Provider
    //   domain={process.env.REACT_APP_AUTH0_DOMAIN || ""}
    //   clientId={process.env.REACT_APP_AUTH0_CLIENTID || ""}
    //   audience="https://sf-hasura-notes.herokuapp.com/graphql"
    //   redirectUri={window.location.origin}
    //   onRedirectCallback={onRedirectCallback}
    // >
    <AuthorizedApolloProvider>
      <DefaultLayout>
        <Router history={history}>
          <PublicRoute path="/notes" component={NotesPage} />
          <PublicRoute path="/" exact component={HomePage} />
        </Router>
      </DefaultLayout>
    </AuthorizedApolloProvider>
    // </Auth0Provider>
  );
}

export default App;

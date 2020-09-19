import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import Client from "./common/apollo";
import DefaultLayout from "./layouts/default";
import NotePage from "./pages/NotesPage";

import "./App.css";

function App() {
  return (
    <ApolloProvider client={Client}>
      <Router>
        <DefaultLayout>
          <Route path="/notes">
            <div className="py-2 bg-white rounded-lg shadow-lg h-full">
              <NotePage />
            </div>
          </Route>
          <Route path="/" exact>
            <div className="py-2 text-center bg-white rounded-lg shadow-lg h-full">
              <h3>Default Root Page</h3>
              <Link to="/notes">Go to Notes!</Link>
            </div>
          </Route>
        </DefaultLayout>
      </Router>
    </ApolloProvider>
  );
}

export default App;

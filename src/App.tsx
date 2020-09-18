import React from "react";
import { ApolloProvider } from "@apollo/client";
import Client from "./common/apollo";
import DefaultLayout from "./layouts/default";
import NotePage from "./pages/Notes";

import "./App.css";

function App() {
  return (
    <ApolloProvider client={Client}>
      <DefaultLayout>
        <div className="py-2 bg-white rounded-lg shadow-lg h-64">
          <NotePage />
        </div>
      </DefaultLayout>
    </ApolloProvider>
  );
}

export default App;

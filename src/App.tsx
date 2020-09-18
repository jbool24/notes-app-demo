import React from "react";
import { ApolloProvider } from "@apollo/client";
import Client from "./common/apollo";
import DefaultLayout from "./layouts/default";

import "./App.css";

function App() {
  return (
    <ApolloProvider client={Client}>
      <DefaultLayout>
        <div>
          <h2 className="text-4xl">Apollo app 🚀</h2>
        </div>
      </DefaultLayout>
    </ApolloProvider>
  );
}

export default App;

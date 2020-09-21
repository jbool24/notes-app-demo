import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  GraphQLRequest
} from "@apollo/client";
// import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";

export default function AuthdApolloProvider({ children }) {
  const { getAccessTokenSilently } = useAuth0();
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
  });

  // const websocketLink = new WebSocketLink({
  //   uri: process.env.REACT_APP_GRAPHQL_WS_ENDPOINT,
  //   options: {
  //     reconnect: true,
  //     connectionParams: {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }
  //   }
  // });
  const authLink = setContext(
    async (_: GraphQLRequest, { headers, ...context }) => {
      const token = await getAccessTokenSilently({
        audience: "https://sf-hasura-notes.herokuapp.com/graphql"
      });

      if (typeof Storage !== "undefined" && token !== undefined) {
        localStorage.setItem("token", token);
      }

      return {
        headers: {
          ...headers,
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
                "x-hasura-role": "user"
              }
            : {
                "x-hasura-admin-secret": process.env.REACT_APP_GRAPHQL_SECRET
              })
        },
        ...context
      };
    }
  );

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV !== "production"
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

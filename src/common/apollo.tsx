import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  split,
  InMemoryCache,
  GraphQLRequest
} from "@apollo/client";
import { OperationDefinitionNode } from "graphql";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";

export default function AuthdApolloProvider({ children }) {
  const { getAccessTokenSilently } = useAuth0();

  const httpsLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
  });

  const wssLink = new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHQL_WS_ENDPOINT,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: async () => {
        const token = await getAccessTokenSilently({
          audience: "https://sf-hasura-notes.herokuapp.com/graphql"
        });

        if (typeof Storage !== "undefined" && token !== undefined) {
          localStorage.setItem("token", token);
        }
        return {
          headers: {
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                  "x-hasura-role": "user"
                }
              : {
                  "x-hasura-admin-secret": process.env.REACT_APP_GRAPHQL_SECRET
                })
          }
        };
      }
    }
  });

  const authLink = setContext(
    async (_: GraphQLRequest, { headers, ...context }) => {
      let token;

      if (typeof Storage !== "undefined" && token !== undefined) {
        token = localStorage.getItem("token");
      } else {
        token = await getAccessTokenSilently({
          audience: "https://sf-hasura-notes.herokuapp.com/graphql"
        });
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

  /** Use Split link to evaluate between a subscription operation
   * and a general http request operation
   */
  const splitLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(
        query
      ) as OperationDefinitionNode;
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wssLink,
    authLink.concat(httpsLink)
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV !== "production"
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

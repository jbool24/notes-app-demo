import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export default function AuthorizedApolloProvider(props: {
  children: JSX.Element;
}) {
  const { getAccessTokenSilently } = useAuth0();

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
  });

  const authLink = setContext(async (_, { headers }) => {
    // const token = await getAccessTokenSilently();
    //
    // console.log("Got Token");
    // console.log(token);

    let authHeaders = (token: String) => ({
      authorization: `Bearer ${token}`,
      "x-hasura-role": "user",
      "x-hasura-admin-secret": process.env.REACT_APP_GRAPHQL_SECRET
    });

    return {
      headers: {
        ...headers,
        // ...authHeaders(token),
        "x-hasura-admin-secret": process.env.REACT_APP_GRAPHQL_SECRET
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

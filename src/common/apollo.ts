import { ApolloClient, InMemoryCache } from "@apollo/client";

const ENV_OR_DEFAULT =
  process.env.GRAPHQL_ENDPOINT ||
  "https://siteform-notes.herokuapp.com/v1/graphql";

const client = new ApolloClient({
  uri: ENV_OR_DEFAULT,
  cache: new InMemoryCache()
});

export default client;

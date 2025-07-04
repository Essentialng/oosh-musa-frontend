import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
const client = new ApolloClient({
  link: new HttpLink({ 
    uri: "http://localhost:4040/graphql/", 
    credentials: "include"
  }),
  cache: new InMemoryCache(),
});
export default client;
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { onError } from 'apollo-link-error'
import { ApolloLink } from "@apollo/client";




const client = new ApolloClient({
   uri: "https://kunzell.stepzen.net/api/tufted-gopher/__graphql",
   headers: {
      Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`
   },
   cache: new InMemoryCache(),
});

export default client;
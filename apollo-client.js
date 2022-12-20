import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
   uri: "https://kunzell.stepzen.net/api/falling-peacock/__graphql",
   headers: {
      Authorization: `APIKey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`
   },
   cache: new InMemoryCache(),
});

export default client;
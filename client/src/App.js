import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// Apollo client setup
const client = new ApolloClient({
  uri: `http://localhost:4000/graphql/`
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app <span role="img">🚀</span> </h2>
    </div>
  </ApolloProvider>
);

export default App;

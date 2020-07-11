import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';

// Apollo client setup
const client = new ApolloClient({
  uri: `http://localhost:4000/graphql/`
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="app">
      <div className="header">
        <div className="wrapper">
          <div className="title">Add Movie </div>
          <AddMovie />
        </div>
      </div>
      <div className="all-movies">
        <div className="grid">
          <MoviesList />
        </div>
      </div>
    </div>
  </ApolloProvider>
);

export default App;

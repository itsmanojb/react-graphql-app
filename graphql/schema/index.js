const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Movie {
      _id: ID!
      title: String!
      year: Int!
      director: Director!
  }

  type Director {
      _id: ID!
      name: String!
      birthday: String!
      movies: [Movie!]
  }

  input DirectorInput {
      name: String!
      birthday: String!
  }

  input MovieInput {
      title: String!
      year: Int
      director: String!
  }

  type RootQuery {
      movies: [Movie!]!
  }

  type RootMutation {
      addMovie(movie: MovieInput): Movie
      addDirector(director: DirectorInput): Director
  }

  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
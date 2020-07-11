const graphql = require('graphql');
const Movie = require('../models/movie');
const Director = require('../models/director');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

// dummy data
// const movies = [
//   { title: 'The Avengers', genre: 'Action/Sci-fi', id: '1', directorId: '1' },
//   { title: 'The Avengers: Age of Ultron', genre: 'Action/Sci-fi', id: '2', directorId: '1' },
//   { title: 'The Avengers: Infinity War', genre: 'Action/Sci-fi', id: '3', directorId: '2' },
//   { title: 'The Avengers: Endgame', genre: 'Action/Sci-fi', id: '4', directorId: '3' }
// ];

// const directors = [
//   { name: 'Joss Whedon', age: 56, id: '1' },
//   { name: 'Anthony Russo', age: 50, id: '2' },
//   { name: 'Joe Russo', age: 48, id: '3' }
// ];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors.filter(director => director.id === parent.directorId);
      }
    }
  })
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies.filter(movie => movie.directorId === parent.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return movies.filter(movie => movie.id === args.id)[0];
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
      }
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return directors.filter(director => director.id === args.id)[0];
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors;
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
const movies = [
  { title: 'The Avengers', genre: 'Action/Sci-fi', id: '1' },
  { title: 'The Avengers: Age of Ultron', genre: 'Action/Sci-fi', id: '2' },
  { title: 'The Avengers: Infinity War', genre: 'Action/Sci-fi', id: '3' },
  { title: 'The Avengers: Endgame', genre: 'Action/Sci-fi', id: '4' }
]

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db / other source
        return movies.filter(movie => movie.id === args.id)[0];
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
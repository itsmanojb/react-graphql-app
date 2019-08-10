const express = require('express');
const bodyParser = require('body-parser');
const graphQlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
// const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const movies = [];

// const schema = require('./schema/schema');

const app = express();
dotenv.config();
const port = process.env.PORT || 4000

// const mongoURI = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PW}@${process.env.MLAB_SERV}/${process.env.MLAB_DB}`;
// mongoose.connect(mongoURI, { useNewUrlParser: true });
// mongoose.connection.once('open', () => {
//     console.log('Connected to Database');
// });

app.use(cors());
app.use(bodyParser.json());
app.use('/graphql', graphQlHTTP({
    schema: buildSchema(`
        type Movie {
            _id: ID!
            title: String!
            year: Int
            director: String!
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
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        movies: () => {
            return movies;
        },
        addMovie: (args) => {
            const movie = {
                _id: Math.random().toString(),
                title: args.movie.title,
                year: args.movie.year,
                director: args.movie.director
            }
            movies.push(movie);
            return movie;
        } 
    },
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});
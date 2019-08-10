const express = require('express');
const bodyParser = require('body-parser');
const graphQlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// const schema = require('./schema/schema');
const Movie = require('./models/movie');
const Director = require('./models/director');

const app = express();
dotenv.config();
const port = process.env.PORT || 4000

const mongoURI = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PW}@${process.env.MLAB_SERV}/${process.env.MLAB_DB}`;
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Connected to Database');
});

app.use(cors());
app.use(bodyParser.json());
app.use('/graphql', graphQlHTTP({
    schema: buildSchema(`
        type Movie {
            _id: ID!
            title: String!
            year: Int!
            director: String!
        }

        type Director {
            _id: ID!
            name: String!
            birthday: String!
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
    `),
    rootValue: {
        movies: async () => {
            try {
                const movies = await Movie.find();
                return movies.map(movie => {
                    return { ...movie._doc };
                });
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        },
        addMovie: args => {
            const movie = new Movie({
                title: args.movie.title,
                year: args.movie.year,
                director: '5d4ede7be361ba051fcafb45'
            })

            return movie
            .save()
            .then(result => {
                addedMovie = { ...result._doc };
                return Director.findById('5d4ede7be361ba051fcafb45');
            })
            .then(director => {
                if(!director) {
                    throw new Error('Director doesn\'t Exist');
                }
                director.movies.push(movie);
                return director.save();
            })
            .then(() => {
                return addedMovie;
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
        },
        addDirector: async args => {
            const directorExists = await Director.findOne({ name: args.director.name });
            if (directorExists) {
                throw new Error(`Director ${args.director.name} already exists`);
            }
            else {
                const director = new Director({
                    name: args.director.name,
                    birthday: new Date(args.director.birthday),
                });
                return director.save().then(result => {
                    return { ...result._doc };
                }).catch(err => {
                    console.log(err);
                    throw err;
                });
            }
  
        } 
    },
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});
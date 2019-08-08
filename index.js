const express = require('express');
const bodyParser = require('body-parser');
const graphQlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const schema = require('./schema/schema');

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
        type RootQuery {
            movies: [String!]!
        }

        type RootMutation {
            addMovie(name: String): String
        }


        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        movies: () => {
            return ['Titanic', 'I.T'];
        },
        addMovie: (args) => {
            const movieName = args.name;
            return movieName;
        } 
    },
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});
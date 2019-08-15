const express = require('express');
const bodyParser = require('body-parser');
const graphQlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolver = require('./graphql/resolvers/index');

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
    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});
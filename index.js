const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();
const port = process.env.PORT || 4000

const mongoURI = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PW}@${process.env.MLAB_SERV}/${process.env.MLAB_DB}`;
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Connected to Database');
});

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
})
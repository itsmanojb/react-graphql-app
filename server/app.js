require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();
const port = process.env.PORT || 4000;

process.on('uncaughtException', err => {
  console.log('Unhandler Exception! Shutting Down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const connectionString = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@ds161794.mlab.com:61794/${process.env.DATABASE_NAME}`;

mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
mongoose.connection.once('open', () => {
  console.log(`Connected to ${process.env.DATABASE_NAME} Database`);
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
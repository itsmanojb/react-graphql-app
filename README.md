# React GraphQL App

This template app can be used for building application that using `React` as frontend and `GraphQL` for APIs.

#### Introduction

This is a simple movie listing application, where user can add movies from UI and view the listing. For the sake of simplicity this uses only two collection `Movies` and `Directors`. In this app template following topics are covered:

- Client App Setup (React)
- Server Setup (Node/Express)
- MongoDB models and schemas
- GraphQL basics (queries, mutations)
- React hooks for GraphQL queries (Apollo)


#### How To Reuse
Create a repo using this template. Setup the environment, i.e. create a `.env` file and put the following values, which you can get from [MLAB](https://mlab.com/).

```

DB_PORT=<database_port>
DB_NAME=<database_name>
DB_USER=<database_username>
DB_PASS=<database_password>

```
**Note**: _PORT is not neccessary, it's just that, the connection string is created that way. Modify these as you like._

#### Server/ Backend
This is barebone node/express project with `models` and `schema` folders already created. Add models, schemas according to your project needs. To run the server, open up terminal and run the following command:

```
$ nodemon app
```
Terminal will have logs like:

![Server](/server-running.png?raw=true "")

_Now Server is listening to port 4000 for any incoming requests. There's no need to restart the server everytime you change in code, it will automatically reflect._

<br>

#### Client/ Frontend
This is a react application with only two components _viz_ `MovieList` and `AddMovie` that consume GraphQL queries and mutation. Add more components and make changes in the project structure according to your convenience. To run the server, open up new terminal window and run the following command:
```
$ npm start
```
The React app will be served on default port(3000) and terminal will have logs like:

![Client](/client-running.png?raw=true "")

<br>

Now go to url `localhost:3000` in your browser and 
on successful execution, you'll see the app will  look like this:


![UI](/application-ui.png?raw=true "")
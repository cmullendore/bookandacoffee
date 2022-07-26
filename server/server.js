const path = require('path')
const fs = require('fs');

const express = require('express');

const { typeDefs, resolvers } = require('./schemas');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const consoleLogger = (req, res, next) => {
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  let log = `${method}:${url} ${status}`;
  console.log(log);
  next();
};
app.use(consoleLogger);

const clientPath = path.resolve('client/build');

if (fs.existsSync(clientPath)) {
  console.log("Located client app files")
  app.use(express.static(clientPath));

  app.get('/', function (req, res) {
    res.sendFile(path.join(clientPath, 'index.html'));
  });

  app.get('/saved', function (req, res) {
    res.sendFile(path.join(clientPath, 'index.html'));
  });

}

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  db.once('open', () => {


    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  })
};

startApolloServer(typeDefs, resolvers);
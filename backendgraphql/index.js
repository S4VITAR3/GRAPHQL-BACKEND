const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

//Database Connection
const URL =
  //"mongodb+srv://graphql_mdb:contraseña@cluster0.bgbbx.mongodb.net/?retryWrites=true&w=majority"
  //    "mongodb+srv://graphql:MarcoVargas1022@cluster0.hufjaur.mongodb.net/mongo1_curso"
  //"mongodb+srv://root:1999@cluster0.ttrguhv.mongodb.net/test"
  "mongodb+srv://root:1999@cluster0.ttrguhv.mongodb.net/test"
mongoose.connect(
  URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log("DB CONNECTED")
);


const startServer = async () => {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const cors = require("cors");
  const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  }

  app.use(cors(corsOptions))
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });
  app.listen(4000, () => console.log("Server UP & RUnning *4000"));
  console.log("http://localhost:4000/graphql");
  app.use(cors)
};
startServer();

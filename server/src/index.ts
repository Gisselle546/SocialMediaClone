import "reflect-metadata";
require('dotenv').config();

const port = process.env.PORT || 2000;
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import Express from "express";
import { createConnection } from "typeorm";
import {createSchema} from './utils/createSchema';


const main = async () => {

const app = Express();
app.use( cors({origin:"http://localhost:3000",credentials:true}) );

await createConnection()
    
const schema = await createSchema();
  
const apolloServer = new ApolloServer({
    schema,
    context: ({ req,res }) => ({ 
     req,
     res
     
    })
  });

apolloServer.applyMiddleware({ app, path:'/api',cors:false});
  
app.listen(port, () => {
  console.log("App started");
  
});
};

main();

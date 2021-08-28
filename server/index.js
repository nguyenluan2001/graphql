const express=require("express")
const {ApolloServer}=require("apollo-server-express")

const database=require("./config/database")
const mongoDatabaseFunction=require("./data/functions")
// Load schema and resolvers
const typeDefs=require("./schema/schema")
const resolvers=require("./resolvers/resolvers")
const app=express()
database.connect()
const server=new ApolloServer({
    typeDefs,
    resolvers,
    context:()=>({mongoDatabaseFunction})
})

async function serverStart()
{
    await server.start();
    server.applyMiddleware({app})
}
serverStart()
app.listen(5000,()=>{
    console.log(`server start at http://localhost:5000${server.graphqlPath}`)
})
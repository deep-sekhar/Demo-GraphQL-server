const express = require('express')
const app = express()
const axios = require('axios')

// import graphql 
const {
    buildSchema
  } = require('graphql')

// graphql for express 
var { graphqlHTTP } = require('express-graphql');
// =============================================================

// scehma 
// queries 
let message = "hi BRO"

const schema = buildSchema(`

  type Post{
    userId: Int
    id :Int
    title: String
    body: String
  }

  type User{
    name:String
    age:Int
    college: String
  }

  type Query {
    hello: String
    welcomeMessage(name: String, work: String!) : String!
    getuser: User
    getusers: [User]
    getposts: [Post]  
    Message: String
  }

  input UserInput{
    name:String!,college:String!,age:Int!
  }

  type Mutation{
    setMessage(newmsg:String):String
    createUser(user: UserInput) : User
  }

`) 

// resolvers 
const root = {
    hello: ()=>{
        return "hello world"
    },
    welcomeMessage: (args)=>{
        return `hi ${args.name}`
    },
    getuser: ()=>{
        user = {
            name:"deep", age:20, college:"kgp"
        }
        return user;
    },
    getusers: ()=>{
        users = [
            {
                name:"deep", age:20, college:"kgp"
            },
            {
                name:"sayan", age:18, college:"kgp"
            }
        ]
        return users;
    },
    getposts: async()=>{
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
        return res.data
    },
    setMessage :({newmsg})=>{
        message = newmsg;
        return message
    },
    Message:()=>{return message},
    createUser:(args)=>{
        return args.user
    }
}

// use graphql endpoint 
app.use('/graphql',graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root
  }))

// start server 
app.listen(5000, () => console.log('Server Running'))
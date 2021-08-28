const Author=require("../models/Author")
const Book=require("../models/Book")
const {books,authors}=require("../data/static")
const resolvers={
    // QUERY
    Query:{
        books:async (parent,args,context)=>{
            let books=await context.mongoDatabaseFunction.getAllBooks()
            return books
        },
        book:async (parent,args,{mongoDatabaseFunction})=>await mongoDatabaseFunction.getBookById(args.id),
        authors:async (parent,args,{mongoDatabaseFunction})=>await mongoDatabaseFunction.getAllAuthors(), 
        author:(parent,args,context)=>{
            return context.mongoDatabaseFunction.getAuthorById(args.id)
        }
    },
    Book:{
        name:(parent,args)=>{
            return "Mr."+parent.name
        },
        author:async (parent,args,{mongoDatabaseFunction})=>await mongoDatabaseFunction.getAuthorById(parent.authorID) ,
    },
    Author:{
        name:(parent,args)=>{
            return "Mr."+parent.name
        },
        books:async (parent,args,{mongoDatabaseFunction})=>await mongoDatabaseFunction.getBooksByAuthor(parent.id)
    },
    // MUTATION
    Mutation:{
         createAuthor:async (parent,args,{mongoDatabaseFunction})=>await mongoDatabaseFunction.createAuthor(args),
        createBook:async (parent,args,{mongoDatabaseFunction})=>await mongoDatabaseFunction.createBook(args)
    }
}
module.exports=resolvers
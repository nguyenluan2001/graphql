const Author = require("../models/Author")
const Book = require("../models/Book")
const { books, authors } = require("../data/static")
const resolvers = {
    // QUERY
    Query: {
        books: async (parent, args, context) => {
            let books = await context.mongoDatabaseFunction.getAllBooks()
            return books
        },
        book: async (parent, args, { mongoDatabaseFunction }) => await mongoDatabaseFunction.getBookById(args.id),
        authors: async (parent, args, { mongoDatabaseFunction }) => await mongoDatabaseFunction.getAllAuthors(),
        author: (parent, args, context) => {
            return context.mongoDatabaseFunction.getAuthorById(args.id)
        }
    },
    Book: {
        author: async (parent, args, { mongoDatabaseFunction }) => await mongoDatabaseFunction.getAuthorById(parent.authorID)
    },
    Author: {
        books: async (parent, args, { mongoDatabaseFunction }) => await mongoDatabaseFunction.getBooksByAuthor(parent.id)
    },
    // MUTATION
    Mutation: {
        createAuthor: async (parent, args, { mongoDatabaseFunction }) => await mongoDatabaseFunction.createAuthor(args),
        createBook: async (parent, args, { mongoDatabaseFunction }) => await mongoDatabaseFunction.createBook(args),
        updateBook:async (parent,{id,name,genre,authorID},{mongoDatabaseFunction})=>{
            await mongoDatabaseFunction.updateBook(id,{
                name:name,
                genre:genre,
                authorID:authorID
            })
            return {id,name,genre,authorID}
        },
        deleteBook: async (parent, { id }, { mongoDatabaseFunction }) => {
            await mongoDatabaseFunction.deleteBook(id)
            return true
        },
        updateAuthor: async (parent, args, { mongoDatabaseFunction }) => {
            await mongoDatabaseFunction.updateAuthor(args.id, {
                name: args.name,
                age: args.age
            })
            return {
                id: args.id,
                name: args.name,
                age: parseInt(args.age)
            }
        },
        deleteAuthor: async (parent, { id }, { mongoDatabaseFunction }) => await mongoDatabaseFunction.deleteAuthor(id)

    }
}
module.exports = resolvers
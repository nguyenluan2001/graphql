const Author = require("../models/Author")
const Book = require("../models/Book")
const mongoDataseFunction = {
    getAllBooks: async () => await Book.find({}),
    getBookById: async id => await Book.findOne({ _id: id }),
    getBooksByAuthor: async authorID => await Book.find({ authorID: authorID }),
    createBook: async (args) => {
        let book = new Book(args)
        return await book.save()
    },
    updateBook:async (id,data)=>await Book.updateOne({_id:id},data),
    deleteBook:async id=>await Book.deleteOne({_id:id}),
    createAuthor: async (args) => {
        let author = new Author(args)
        return await author.save()
    },
    getAllAuthors: async () => await Author.find({}),
    getAuthorById: async id => await Author.findOne({ _id: id }),
    updateAuthor: async (id, data) => await Author.updateOne({ _id: id }, data),
    deleteAuthor: async id => {
        await Author.deleteOne({ _id: id })
        return true
    },

}
module.exports = mongoDataseFunction
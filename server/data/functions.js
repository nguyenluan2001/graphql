const Author=require("../models/Author")
const Book=require("../models/Book")
const mongoDataseFunction={
    getAllBooks:async ()=>await Book.find({}),
    getBookById:async id=>await Book.findOne({_id:id}),
    getBooksByAuthor:async authorID=>await Book.find({authorID:authorID}),
    createBook:async (args)=>{
        let book=new Book(args)
        return await book.save()
    },
    createAuthor:async (args)=>{
        let author=new Author(args)
        return await author.save()
    },
    getAllAuthors:async ()=>await Author.find({}),
    getAuthorById:async id=>await Author.findOne({_id:id})

}
module.exports=mongoDataseFunction
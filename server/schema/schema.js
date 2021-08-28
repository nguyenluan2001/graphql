const {gql}=require("apollo-server-express")
const typeDefs=gql`
    type Book{
        id:ID
        name:String
        genre:String
        author:Author
    }
    type Author{
        id:ID!
        name:String
        age:Int
        books:[Book]
    }

    # ROOT TYPE
    type Query {
        books:[Book]
        book(id:ID!):Book
        authors:[Author]
        author(id:ID!):Author
    }
    # Write data into database
    type Mutation{
        createAuthor(name:String,age:Int):Author
        createBook(name:String,genre:String,authorID:ID):Book
        updateBook(id:ID!,name:String,genre:String,authorID:ID):Book
        deleteBook(id:ID):Boolean
        updateAuthor(id:ID,name:String,age:Int):Author
        deleteAuthor(id:ID):Boolean
    }
`
module.exports=typeDefs
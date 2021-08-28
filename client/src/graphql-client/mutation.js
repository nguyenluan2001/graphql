import {gql} from "@apollo/client"
const createAuthor=gql`
    mutation createAuthor($name:String,$age:Int)
    {
        createAuthor(name:$name,age:$age)
        {
            id
            name
        }
    }
`
const createBook=gql`
    mutation createBook($name:String,$genre:String,$authorID:ID)
    {
        createBook(name:$name,genre:$genre,authorID:$authorID)
        {
            name
        }
    }
`
const updateBook=gql`
    mutation updateBook($id:ID!,$name:String,$genre:String,$authorID:ID)
    {
        updateBook(id:$id,name:$name,genre:$genre,authorID:$authorID)
        {
            id
            name
            genre
        }
    }
`
const deleteBook=gql`
    mutation deleteBook($id:ID)
    {
        deleteBook(id:$id)
    }
`
export {createAuthor,createBook,deleteBook,updateBook}
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
export {createAuthor,createBook}
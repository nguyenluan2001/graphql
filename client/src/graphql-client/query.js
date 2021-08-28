import { gql } from "@apollo/client"
const getBooks = gql`
    query getAllBooks
    {
       books{
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                }
            }
       }
    }
`
const getBookById=gql`
    query getBookById($id:ID!)
    {
        book(id:$id)
        {
            name
            genre
            author
            {
                id
                name
                books
                {
                    name
                }
            }
        }
    }
`
const getAuthors=gql`
    query getAuthors
    {
        authors{
            id
            name
        }
    }
`
export {getBooks,getBookById,getAuthors}
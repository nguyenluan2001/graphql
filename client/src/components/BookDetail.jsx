import React from 'react'
import {useQuery} from "@apollo/client"
import {getBookById} from "../graphql-client/query"
function BookDetail({bookId}) {
    const {loading,error,data}=useQuery(getBookById,{
        variables:{
            id:bookId
        }
    })
    console.log(data)
    return (
        <>
            <div class="card">
                <div class="card-body">
                    <h5>{data?.book.name}</h5>
                    <p>{data?.book.genre}</p>
                    <p>{data?.book.author.name}</p>
                    <p>{data?.book.author.age}</p>
                    <p>All books by this author</p>
                    <ul>
                    {data?.book.author.books.map(item=>{
                        return <li>{item.name}</li>
                    })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default BookDetail

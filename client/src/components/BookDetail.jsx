import React from 'react'
import {useQuery} from "@apollo/client"
import {getBookById} from "../graphql-client/query"
function BookDetail({selectedBook}) {
    const {loading,error,data}=useQuery(getBookById,{
        variables:{
            id:selectedBook?.id
        }
    })
    console.log(selectedBook)
    return (
        <>
            <div class="card">
                <div class="card-body">
                    <h5>{data?.book?.name}</h5>
                    <p>{data?.book?.genre}</p>
                    <p>{data?.book?.author.name}</p>
                    <p>{data?.book?.author.age}</p>
                    <p>All books by this author</p>
                    <ul>
                    {data?.book?.author.books.map(item=>{
                        return <li>{item.name}</li>
                    })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default BookDetail

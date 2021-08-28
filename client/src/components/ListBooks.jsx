import React from 'react'
import { useQuery,useMutation } from "@apollo/client"
import { getBooks } from "../graphql-client/query"
import {deleteBook} from "../graphql-client/mutation"
function ListBooks({setSelectedBook,setEditBook}) {
    const { loading, error, data } = useQuery(getBooks)
    const [deleteBookMutation,dataMutation]=useMutation(deleteBook)
    if (loading) return <p>Loading books...</p>
    console.log(data)
    function handleDelete(book)
    {
        deleteBookMutation({
            variables:{
                id:book.id
            },
            refetchQueries:[{query:getBooks}]

        })
        console.log(book)
    }
    return (
        <>
            <div className="container border-right">
                <div className="row">
                    {data?.books.map(item => {
                        return <div className="col-4" >
                            <div class="card" onClick={()=>setSelectedBook(item)}>
                                <div class="card-body">
                                    <h5 class="card-title">{item.name}</h5>
                                    <button className="btn btn-info" onClick={()=>handleDelete(item)}>Delete</button>
                                    <button className="btn btn-danger" onClick={()=>setEditBook(item)}>Edit</button>
                                </div>
                            </div>
                        </div>

                    })}

                </div>
            </div>
        </>
    )
}

export default ListBooks

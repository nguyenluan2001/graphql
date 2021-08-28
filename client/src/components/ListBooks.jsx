import React from 'react'
import { useQuery } from "@apollo/client"
import { getBooks } from "../graphql-client/query"
function ListBooks({setBookId}) {
    const { loading, error, data } = useQuery(getBooks)
    if (loading) return <p>Loading books...</p>
    console.log(data)
    return (
        <>
            <div className="container border-right">
                <div className="row">
                    {data?.books.map(item => {
                        return <div className="col-4" >
                            <div class="card" onClick={()=>setBookId(item.id)}>
                                <div class="card-body">
                                    <h5 class="card-title">{item.name}</h5>
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

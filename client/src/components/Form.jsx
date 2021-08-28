import React from 'react'
import { useFormik } from "formik"
import { useQuery, useMutation } from "@apollo/client"
import { getAuthors, getBooks } from "../graphql-client/query"
import { createAuthor, createBook } from "../graphql-client/mutation"
function Form() {
    const { loading, error, data } = useQuery(getAuthors)
    const [addAuthor, dataMutationAuthor] = useMutation(createAuthor)
    const authorForm = useFormik({
        initialValues: {
            name: "",
            age: ""
        },
        onSubmit: values => {
            console.log(parseInt(values.age))
            addAuthor({
                variables: {
                    name: values.name,
                    age: parseInt(values.age)
                },
                refetchQueries: [{ query: getAuthors }]
            })
        }
    })
    const [addBook, dataMutationBook] = useMutation(createBook)
    const bookForm = useFormik({
        initialValues: {
            name: "",
            genre: "",
            authorID: ""
        },
        onSubmit: values => {
            console.log(values)
            addBook({
                variables: {
                    name: values.name,
                    genre: values.genre,
                    authorID: values.authorID
                },
                refetchQueries:[{query:getBooks}]
            })
        }
    })
   
    console.log(data)
    return (
        <>
            <div className="col-6">
                <form action="" onSubmit={bookForm.handleSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="Book name" name="name" onChange={bookForm.handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Book genre" name="genre" onChange={bookForm.handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <select name="authorID" onChange={bookForm.handleChange} id="" className="custom-select">
                            {
                                data?.authors.map(item => {
                                    return <option value={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <button className="btn btn-success">Add book</button>
                </form>
            </div>
            <div className="col-6">
                <form action="" onSubmit={authorForm.handleSubmit}>
                    <div className="form-group invisible">
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Author name" name="name" onChange={authorForm.handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Author age" name="age" onChange={authorForm.handleChange} className="form-control" />
                    </div>
                    <button className="btn btn-success">Add author</button>

                </form>
            </div>

        </>
    )
}

export default Form

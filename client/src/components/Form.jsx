import React, { useEffect } from 'react'
import { useFormik } from "formik"
import { useQuery, useMutation } from "@apollo/client"
import { getAuthors, getBooks } from "../graphql-client/query"
import { createAuthor, createBook,updateBook } from "../graphql-client/mutation"
function Form({ selectedBook, editBook }) {
    const { loading, error, data } = useQuery(getAuthors)
    const [addAuthor, dataMutationAuthor] = useMutation(createAuthor)
    const [updateBookMutation,dataMutationBookUpdate]=useMutation(updateBook)
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
            if (editBook) {
                console.log(values)
                updateBookMutation({
                    variables:{
                        id:editBook.id,
                        name:values.name,
                        genre:values.genre,
                        authorID:values.authorID
                    },
                    refetchQueries:[{query:getBooks}]
                })
            }
            else {
                console.log(values)
                addBook({
                    variables: {
                        name: values.name,
                        genre: values.genre,
                        authorID: values.authorID
                    },
                    refetchQueries: [{ query: getBooks }]
                })
            }
        }
    })
    useEffect(() => {
        if (editBook) {
            bookForm.setFieldValue("name", editBook.name)
            bookForm.setFieldValue("genre", editBook.genre)
            bookForm.setFieldValue("authorID", editBook.author.id)
            console.log(editBook)
        }
    }, [editBook])
    return (
        <>
            <div className="col-6">
                <form action="" onSubmit={bookForm.handleSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="Book name" name="name" value={bookForm.values.name} onChange={bookForm.handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Book genre" name="genre" value={bookForm.values.genre} onChange={bookForm.handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <select name="authorID" value={bookForm.values.authorID} onChange={bookForm.handleChange} id="" className="custom-select">
                            {
                                data?.authors.map(item => {
                                    return <option selected={item.id == bookForm.values.authorID ? "selected" : ""} value={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                    {
                        editBook ?
                            <button className="btn btn-danger    ">Edit book</button>
                            : <button className="btn btn-success">Add book</button>
                    }

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

import {useState} from "react"
import BookDetail from "./components/BookDetail";
import Form from "./components/Form";
import ListBooks from "./components/ListBooks";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
})
function App() {
  const [bookId,setBookId]=useState(null)
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="container">
          <h3>My Books</h3>
          <div className="row">
            <Form></Form>
            <div className="col-12">
              <div className="container">
                <div className="row">
                  <div className="col-7">
                    <ListBooks setBookId={setBookId}></ListBooks>
                  </div>
                  <div className="col-5">
                    <BookDetail bookId={bookId}></BookDetail>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;

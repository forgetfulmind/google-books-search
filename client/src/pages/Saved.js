import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { FormBtn } from "../components/Form";

function Saved() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(event) {
    console.log(event.target.id)
    API.deleteBook(event.target.id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

function authors(authArry){
  console.log(authArry)  
  if (authArry){
    return authArry.toString("")
  }
}

return (
  <Container fluid>
    <Row>
      <Col size="md-6 sm-12">
        {books.length ? (
          <List>
            {books.map(book => (
              <ListItem key={book.id}>
                 <div >
                 <Row>
                 <Col size="3">
                    {book.image ? (
                    <img src={book.image} alt="cover image" />
                    ): <div></div>
                    }
                        </Col>
                    <Col size="9">
                    <strong>Title: </strong>{book.title}
                    <br></br>
                    <strong>Author(s): </strong>{authors(book.authors)}
                    <br></br>
                    <strong>Description: </strong>{book.description}
                    <br></br>
                    <strong>Link: </strong><a href={book.link}>{book.link}</a>
                    </Col>
                    <FormBtn
                      id={book._id}
                      onClick={(e)=>deleteBook(e)}
                      >
                     Delete Book
                    </FormBtn>
                    </Row>
                  </div>
              </ListItem>
            ))}
          </List>
        ) : (
          <h3>No Results to Display</h3>
        )}
      </Col>
    </Row>
  </Container>
);
  }


export default Saved;

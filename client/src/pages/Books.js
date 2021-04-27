import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  // useEffect(() => {
  //   loadBooks()
  // }, [])

  // // Loads all books and sets them to books
  // function loadBooks() {
  //   API.getBooks()
  //     .then(res => 
  //       setBooks(res.data)
  //     )
  //     .catch(err => console.log(err));
  // };
function saveBook (event){
  console.log(books)
  console.log(event.target)
  let chosenOne = books.filter(book => book.id === event.target.id)
  console.log(chosenOne[0].volumeInfo.authors)
  API.saveBook({
            title: chosenOne[0].volumeInfo.title,
            authors: chosenOne[0].volumeInfo.authors,
            description: chosenOne[0].volumeInfo.description,
            image: chosenOne[0].volumeInfo.imageLinks.smallThumbnail,
            link: chosenOne[0].volumeInfo.infoLink
          })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }


  // Deletes a book from the database with a given id, then reloads books from the db
  // function deleteBook(id) {
  //   API.deleteBook(id)
  //     .then(res => loadBooks())
  //     .catch(err => console.log(err));
  // }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
//   function handleFormSubmit(event) {
//     event.preventDefault();
//     if (formObject.title && formObject.author) {
//       API.saveBook({
//         title: formObject.title,
//         author: formObject.author,
//         synopsis: formObject.synopsis
//       })
//         .then(res => loadBooks())
//         .catch(err => console.log(err));
//     }
//   };
function handleFormSubmit(event) {
    event.preventDefault();
    let search = formObject.book
    console.log(formObject.book)
    search = search.split(' ')
    search = search.join('')
    console.log(search)
      API.searchBooks(search)
        // .then(res =>  console.log(res.data.items[0].volumeInfo.imageLinks.smallThumbnail))
        .then(res =>  setBooks(res.data.items))
        .catch(err => console.log(err));
    
  };

  function authors(authArry){
    console.log(authArry)  
    if (authArry){
      return authArry.toString("")
    }
  }


    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <form>
              <Input
                onChange={handleInputChange}
                name="book"
                placeholder="book title"
              />
              <FormBtn
                disabled={!(formObject.book)}
                onClick={handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book.id}>
                     <div >
                     <Row>
                     <Col size="3">
                        {book.volumeInfo.imageLinks ? (
                        <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="cover image" />
                        ): <div></div>
                        }
                            </Col>
                        <Col size="9">
                        <strong>Title: </strong>{book.volumeInfo.title}
                        <br></br>
                        <strong>Author(s): </strong>{authors(book.volumeInfo.authors)}
                        <br></br>
                        <strong>Description: </strong>{book.volumeInfo.description}
                        <br></br>
                        <strong>Link: </strong><a href={book.volumeInfo.infoLink}>{book.selfLink}</a>
                        </Col>
                        <FormBtn
                          id={book.id}
                          onClick={e => saveBook(e)}
                          >
                         Save Book
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


export default Books;

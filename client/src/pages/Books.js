import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import Book from "../components/Book";
import Book2 from "../components/Book2";
require('dotenv').config();

class Books extends Component {
 
  state = {
    books: [],
    query: "",
    title: "",
    author: "",
    description: "",
    booksSearched: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteBook = event => {
    event.preventDefault();
    let bookid = event.target.getAttribute("dataid");
    API.deleteBook(bookid)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSave = event => {
    event.preventDefault();
    if (event.target.parentNode.querySelector('.title').textContent) {
      API.saveBook({
        bookid: event.target.parentNode.querySelector("img").id,
        title: event.target.parentNode.querySelector('.title').textContent,
        author: event.target.parentNode.querySelector('.author').textContent,
        description: event.target.parentNode.querySelector('.descript').textContent,
        link: event.target.parentNode.querySelector('.link').href,
        image: event.target.parentNode.querySelector('img').src
      })
        .then(res => {
          this.loadBooks()})
        .catch(err => console.log(err));
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.findBooks(this.state.query).then(results => {
      let filteredBooks = results.data.items.map(book =>{
        let id = book.id;
        let title=book.volumeInfo.title;
        let author=book.volumeInfo.authors[0];
        let description=book.volumeInfo.description;
        let link=book.volumeInfo.previewLink; 
        let image = "";       
        if (book.volumeInfo.imageLinks && typeof(book.volumeInfo.imageLinks.thumbnail) !== "undefined"  ) {
          image = book.volumeInfo.imageLinks.thumbnail;
        } else {
          image = "https://cidco-smartcity.niua.org/wp-content/uploads/2017/08/No-image-found.jpg";
        }
        return {
          id ,title, author, description, link, image
        }
      })

      this.setState({booksSearched: filteredBooks});
      });
    };

  getBooks = () => {

  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Do Are Looking For?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.query}
                onChange={this.handleInputChange}
                name="query"
                placeholder="Book Title"
              />
              <FormBtn
                disabled={!this.state.query}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
            <br />
            <br />
            <hr />
            {this.state.booksSearched.map(book => (
              
          <Book
            id={book.id}
            image={book.image}
            title={book.title}
            author={book.author}
            description={book.description}
            link={book.link}
            key={book.id}  
            saveBook={this.handleSave}>
            <DeleteBtn />
          </Book>
        ))}
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Saved Books</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <Book2
                  id={book._id}
                  image={book.image}
                  title={book.title}
                  author={book.author}
                  description={book.description}
                  link={book.link}
                  key={book._id}
                  deleteBook={this.deleteBook}
                />
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
}

export default Books;

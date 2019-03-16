import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import Book from "../components/Book";
require('dotenv').config();

class Books extends Component {
 
  state = {
    books: [],
    query: "",
    title: "",
    author: "",
    synopsis: "",
    booksSearched: []
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }

  // loadBooks = () => {
  //   API.getBooks()
  //     .then(res =>
  //       this.setState({ books: res.data, title: "", author: "", synopsis: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  deleteBook = id => {
    API.deleteBook(id)
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
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // if (this.state.query) {
    //   let split = this.state.query.split(" ");
    //   let query = split[0];
    //   for (let i in split) {
    //     if (i !== "0") {
    //       query += "+" + split[i];
    //     }
    //   }
    //   console.log(query);

    API.findBooks(this.state.query).then(results => {
      console.log(results.data.items);
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
            // title={book.volumeInfo.title}
            // author={book.volumeInfo.authors[0]}
            // description={book.volumeInfo.description}
            // link={book.volumeInfo.previewLink}
            key={book.id}  
          />
        ))}
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
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
}

export default Books;

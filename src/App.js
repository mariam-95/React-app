import React from 'react'
import './App.css'
import {Route} from 'react-router-dom';
import Home from './home';
import Search from './search';
import {getAll, update} from './BooksAPI';
import sortBy from 'sort-by';

class BooksApp extends React.Component {
  componentDidMount() {
    this.setState({
      isLoading: true
    });
    getAll().then(books => {
      books.sort(sortBy('title'));
      this.setState({isLoading: false, books});
    });
  }
  state = {
    books: [],
    isLoading: false
  }

  /**
   * rearranging (updating) the book list immediately based on the choosen book shelf
   */
  rearrangeBooks = (book, shelf) => {
    this.setState(prevState => {
      let books;
      if (shelf === 'none') {
        // deleting from list
        books = prevState.books.filter(b => (b.id !== book.id));
      } else if (this.state.books.some(b => (b.id === book.id))) {
        // book already exists in list. Shelf update needed
        books = prevState.books.map(b => {
          if (b.id !== book.id) {
            return b;
          } else {
            return {...b, ...{shelf}}
          }
        })
      } else {
        // beand new book not in the list
        let newBook = {...book, ...{shelf}};
        books = prevState.books.concat(newBook);
      }
      books.sort(sortBy('title'));
      return {...prevState, ...{books}};
    });
  }

  /**
   * Called when user is changing status
   */
  onBookStatusChange = (book, evt) => {
    let data = {...{id: book.id}};

    this.rearrangeBooks(book, evt.target.value);
    update(data, evt.target.value)
      .then(() => this.props.history.push('/'));
  }

  render() {
    const {books, isLoading} = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => <Home isLoading={isLoading} onBookStatusChange={this.onBookStatusChange} books={books} />} />
        <Route path='/search' render={() => <Search books={books} onBookStatusChange={this.onBookStatusChange} />} />
      </div>
    )
  }
}

export default BooksApp

import React from 'react';
import {Link} from 'react-router-dom';
import * as API from '../BooksAPI';
import BooksGrid from '../Books';
import sortBy from 'sort-by';

class Search extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      searchFor: '',
      results: []
    };
  }

  /**
   * debounced function to call when user has finished typing
   * @type {mixed} null or function to execute
   */
  timeoutFunc = null;

  /**
   * setTimeout reference of debounced ajax call
   * @type {mixed} null or setTimeout reference
   */
  timer = null;

  /**
   * Setting shelf to correct value since /search API not listing the user's own books
   * @param {array} books result of search response
   * @return {array}  amended books array
   */
  setBooksShelf = (books) => {
    const amendedBooks = books.map(book => {
      let filteredByUserBookList = this.props.books.filter(myBook => {
        return book.id === myBook.id;
      });
      let correctShelf = filteredByUserBookList.length && filteredByUserBookList[0].shelf;
      if (correctShelf) {
        return {...book, ...{shelf: correctShelf}};
      } else {
        return book;
      }
    });
    return amendedBooks;
  }

  /**
   * search callback
   * called when user is typing and fires debounced ajax call
   * if user input is empty resets booklist to empty list
   * @param  {Object} evt event object
   * @return {undefined}
   */
  onSearchChange = (evt) => {
    let {target: {value: searchFor}} = evt;

    this.setState({searchFor, isLoading: true});

    // removing prev setTimeout
    window.clearTimeout(this.timer);

    // replacing timeoutFunc to execute
    if (searchFor) {
      this.timeoutFunc = () => {
        API.search(searchFor)
          .then(response => {
            let results = response.error ? [] : this.setBooksShelf(response);
            results.sort(sortBy('title'));
            this.setState({results, isLoading: false});
          });
      };
      this.timer = window.setTimeout(this.timeoutFunc, 500);
    } else {
      // input is empty, reset book list
      this.setState({results: [], isLoading: false});
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input autoFocus type="text" onChange={this.onSearchChange} value={this.state.searchFor} placeholder="Search here"/>
          </div>
        </div>
        <div className="search-books-results">
          <h2 className="bookshelf-title">
            {this.state.isLoading && 'Loading...'}
            {!this.state.isLoading && this.state.searchFor && `Search Results (${this.state.results.length}):`}
          </h2>
          <div className="bookshelf-books">
            <BooksGrid onBookStatusChange={this.props.onBookStatusChange} books={this.state.results} />
          </div>

        </div>
      </div>
    );
  }
};
export default Search;

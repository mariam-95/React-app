import React from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from '../Books';

export default ({isLoading, books, onBookStatusChange}) => {
  let arranged = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };
  books.forEach(book => {
    arranged[book.shelf].push(book)
  });

  // TODO: looping dynamically by keys and map the bookshelf-title
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {isLoading && 'Loading...'}
        <div>
          {!!arranged.currentlyReading.length && (
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <BooksGrid books={arranged.currentlyReading} onBookStatusChange={onBookStatusChange} />
              </div>
            </div>
          )}
          {!!arranged.wantToRead.length && (
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <BooksGrid books={arranged.wantToRead} onBookStatusChange={onBookStatusChange} />
              </div>
            </div>
          )}
          {!!arranged.read.length && (
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BooksGrid books={arranged.read} onBookStatusChange={onBookStatusChange} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

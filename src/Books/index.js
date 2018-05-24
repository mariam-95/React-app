import React from 'react';
import Book from './book';

export default ({books, onBookStatusChange}) => {
  return (
    <ol className="books-grid">
      {books.map(book => (
        <li key={book.id}>
          <Book book={book} onBookStatusChange={onBookStatusChange} />
        </li>
      ))}
    </ol>
  );
}

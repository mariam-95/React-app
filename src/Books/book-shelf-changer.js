import React from 'react';
import bookStatuses from '../status/book-statuses';
import camelCase from 'camel-case';

export default ({book, onBookStatusChange}) => {
  return (
    <div className="book-shelf-changer">
      <select onChange={onBookStatusChange} defaultValue={book.shelf}>
        <option value="" disabled>Move to...</option>
        {bookStatuses.map((status, index) => (
          <option key={index} value={camelCase(status)}>{status}</option>
        ))}
      </select>
    </div>
  );
}

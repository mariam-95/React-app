import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';

jest.mock('./BooksAPI');

it('renders without crashing', () => {
  const div = document.createElement('div')
  const app = mount(<MemoryRouter><App /></MemoryRouter>);
  expect(app.contains(<h1>MyReads</h1>)).toEqual(true);
});

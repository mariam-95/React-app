import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import {HashRouter, Route} from 'react-router-dom'

//The base URL for all locations. as renders <a href="#/react/app">

ReactDOM.render(
  <HashRouter>
    <Route path="/" component={App} />  
      </HashRouter>,
  document.getElementById('root')
);

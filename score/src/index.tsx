import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
  <Switch>
    <Route exact={true} path="/:page?" component={App}/>
    </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

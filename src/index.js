import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

//file and page imports
import './index.css';
import Home from './components/Home';
import Profile from './components/Profile';
import Notfound from './components/Notfound';

import User from "./imgs/user.png";

import * as serviceWorker from './serviceWorker';
//import * as firebase from 'firebase';

//firebase.initalizeApp(config)
//TODO: get config information from firebase console

const routing = (
  <Router>
  <div>
    <div id='nav'>
      <Link to="/"><div class='links' id="title"> Planner Assistant</div></Link>
      <Link to="/profile"><div class='links' id="user"> <img alt="userimg" src={User}/></div></Link>
    </div>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

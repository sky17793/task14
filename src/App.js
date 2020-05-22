import React from 'react';

import './App.css';
import{Bootstrap,Grid ,Row, Col} from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import Signup from './component/Signup';
import Login from './component/Login';
import Information from './component/Information';

import Home from './component/Home';


function App() {
  return (
    <div className="App">
      <Router>
        <h4>
          {" "}
          <NavLink exact to="/">
            {" "}
            Home{" "}
          </NavLink>
          <NavLink to="/login"> LogIn </NavLink>
        </h4>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/leaveapp/:id" component={Information} />
          
        </Switch>
      </Router>

    </div>
  );
}

export default App;

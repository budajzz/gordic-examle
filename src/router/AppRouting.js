import React from "react";
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function AppRouting() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/UserList">User List</Link>
            </li>
            <li>
              <Link to="/form">Users Form</Link>
            </li>
          </ul>
        </nav>
        <Switch>
        <Route path="/UserList">
            <UserList/>
          </Route>
          <Route path="/form">
            <UserForm/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


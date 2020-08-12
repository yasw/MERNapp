import React, {Component} from 'react';

import { BrowserRouter as Router, Route ,Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Vendor from './vendor-list'
import CreateUser from './create-user.component'
import Login from './signin'
import Customer from './customer-list';
//import DashboardVendors from './dashboard-users';
//import DashboardCustomers from './dashboard-customers'

import MyComponent from './facebooklogin';
export default class Navbar extends Component {

    render() {
        return (
            <Router>
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">App</Link>
                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                      <Link to="/vendors" className="nav-link">Vendors</Link>
                    </li>
                    <li className="navbar-item">
                      <Link to="/facebooklogin" className="nav-link">Facebook</Link>
                    </li>
                    <li className="navbar-item">
                      <Link to="/customers" className="nav-link">Customers</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/register" className="nav-link">Create User</Link>
                    </li>
                    <li className="navbar-item">
                      <Link to="/login" className="nav-link">Login</Link>
                    </li>
                  </ul>
                </div>
              </nav>
              <br/>
              <Route path="/vendors" exact component={Vendor}/>
              <Route path="/customers" exact component={Customer}/>
              <Route path="/register" component={CreateUser}/>
              <Route path="/login" component={Login}/>
              <Route path="/facebooklogin" component={MyComponent}/>

            </div>
          </Router>
        )
    }
}

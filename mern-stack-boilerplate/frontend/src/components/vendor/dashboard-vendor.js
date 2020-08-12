import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import Createvendorproduct from './create-vendor-product'
import UsersList from './userproductlist'
import Logout from './logout'
import axios from 'axios';
import Dispatch from './dispatch';
import Vendorating from './vendorrating'
//import DashboardCustomers from './dashboard-customers'
export default class DashboardVendors extends Component {
  constructor(props) {
    super(props);

    this.state = {
           username:JSON.parse(localStorage.getItem('user')),
    }

    }
    render() {
        return (
            <Router>
              <div className="container">
              <form onSubmit={this.onSubmit}>
              <Switch>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <Link to="/login" className="navbar-brand">Home</Link>
                  <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                      <li className="navbar-item">
                        <Link to="/vendorrating" className="nav-link">Ratings</Link>
                      </li>
                      <li className="navbar-item">
                      <Link to="/createvendorproduct" className="nav-link">Create product</Link>
                      </li>
                      <li className="navbar-item">
                        <Link to="/userlist" className="nav-link">Productlist</Link>
                      </li>
                      <li className="navbar-item">
                      <Link to="/dispatch" className="nav-link">Dispatch</Link>
                        
                      </li>



                      <li className="navbar-item">
                      <Link to="/logout" className="nav-link">Logout</Link>
                        
                      </li>
                    </ul>
                  </div>
                </nav>
                <br/>
                </Switch>
                <Route path="/userlist" exact component={UsersList}/>
                <Route path="/createvendorproduct" exact component={Createvendorproduct}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/dispatch" component={Dispatch}/>
                <Route path="/vendorrating" exact component={Vendorating}/>

            </form>
              </div>
            </Router>
          )
    }
}
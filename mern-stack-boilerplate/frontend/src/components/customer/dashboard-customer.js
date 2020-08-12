import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import Productsearch from './productsearch'
//import UsersList from './userproductlist'
import Logout from './logout'
import axios from 'axios';
//import Dispatch from './dispatch';
import  Customerproductlist from './customerproductlist'
import Vendorsearch from './vendorsearch'
import Productwaiting from './productsinwaiting';
import Customerrate from './customerratingandreview'
export default class DashboardCustomers extends Component {
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
                        <Link to="/productlist" className="nav-link">Productlist</Link>
                      </li>
                      <li className="navbar-item">
                        <Link to="/vendorsearch" className="nav-link">  Vendorsearch</Link>
                      </li>
                      <li className="navbar-item">
                      <Link to="/rateandreview" className="nav-link"> Rate</Link>
                      </li>
                      <li className="navbar-item">
                      <Link to="/productwaiting" className="nav-link">Edit</Link>
                      </li>
                      <li className="navbar-item">
                      <Link to="/productsearch" className="nav-link">Search</Link>
                      </li>
                      <li className="navbar-item">
                      <Link to="/logout" className="nav-link">Logout</Link>
                      </li>
                    </ul>
                  </div>
                </nav>
                <br/>
                </Switch>
                <Route path="/productwaiting" exact component={Productwaiting}/>
                <Route path="/productsearch" exact component={Productsearch}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/productlist" exact component={Customerproductlist}/>
                <Route path="/vendorsearch" exact component={Vendorsearch}/>
                <Route path="/rateandreview" exact component={Customerrate}/>
                
            </form>
              </div>
            </Router>
          )
    }
}
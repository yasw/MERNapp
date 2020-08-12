import React, {Component} from 'react';

import Navbar from './login/outernavbar';
import DahboardVendors from './vendor/dashboard-vendor';
import DashboardCustomers from './customer/dashboard-customer'

    
export default class Main extends Component {

    render() {
        let ans;
           if(JSON.parse(localStorage.getItem('type'))=="vendor")
               ans= <DahboardVendors />;
            else if(JSON.parse(localStorage.getItem('type'))=="customer")
               ans= <DashboardCustomers />;
            else
            ans= <Navbar />;
        return (
      <div>{ ans }</div>
          
        )
    }
}

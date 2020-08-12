import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
//import DashboardVendors from './dashboard-users';
//import DashboardCustomers from './dashboard-customers'
import Message from '../../basic/Message';
import Error from '../../basic/Error';
import Register from '../../service/Register';
export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password:'',
            type:"vendor",
            registerSuccess:false,
          
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeType = this.onChangeType.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    onChangeType(event) {
        this.setState({ type: event.target.value });
    }

    onSubmit= async e => {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            type: this.state.type,
            sum:"0",
            number:"0",
            rating:"0"

        }
        const loginResult =  await Register(newUser);
        console.log(loginResult)
        if(loginResult!=200)
        {
        axios.post('http://localhost:4000/adduser', newUser)
             .then(res => console.log(res.data));
             this.setState({
                error: false,
                registerSuccess: true,
              });
        }
        else
        {
          this.setState({
            registerSuccess: false,
            error: true,
        });
        }
        console.log("hi")
    }

    render() {
        if(this.state.registerSuccess)
        {
          window.location.reload();
        }
        return (
            <Router>
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               required/>  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                             required/>
                    </div>
                    <div className="form-group">
                    <label>Type: </label>
                    <br></br>
                    <input type="radio" id="vendor" name="type" checked={this.state.type=="vendor"} onChange={this.onChangeType} value="vendor"/>
                    <label for="vendor">vendor</label>
                    <br></br>
                    <input type="radio" id="customer" name="type" checked={this.state.type=="customer"} onChange={this.onChangeType} value="customer"/>
                    <label for="customer">customer</label>
                    </div>


                    <div className="form-group">
       
                        < input type="submit" value="Create User"   className="btn btn-primary">
                        </ input>
                    </div>
                    {this.state.registerSuccess && <Message message="Registered Sucessfully" />}    {' '}
                  {this.state.error && <Error message="Error in Registration" />}    {' '}
                </form>

            </div>
            </Router>
        )
    }
}
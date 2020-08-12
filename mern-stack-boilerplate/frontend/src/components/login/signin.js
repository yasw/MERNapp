import React, {Component} from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
//import DashboardVendors from './dashboard-users';
import Message from '../../basic/Message';
import Error from '../../basic/Error';
import {
  //  COMMON_FIELDS,
  //  REGISTRATION_FIELDS,
   // LOGIN_FIELDS,
    LOGIN_MESSAGE,
    ERROR_IN_LOGIN,
  } from '../../basic/MessageBundle';
  import LoginService from '../../service/LoginService';
export default class Loginin extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password:'',
            type:"vender",
            loginSuccess:false,
            error:false
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

    onSubmit = async e => {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password,
            type:this.state.type
        }
        //console.log("1")
        console.log(newUser);
        const loginResult =  await LoginService(newUser);
        console.log(loginResult)
        if (loginResult == 204 || loginResult == 400) {
          this.setState({
            error: true,
            loginSuccess: false,
            username: '',
            email: '',
            password:'',
            type:''
          });
        } 
        else
        {
          this.setState({
            loginSuccess: true,

            error: false,
          });
          localStorage.setItem('user',JSON.stringify(this.state.username));
          localStorage.setItem('type',JSON.stringify(this.state.type));
        }
       
         console.log(this.state.error);
    }

  render() {
    if(this.state.loginSuccess||this.state.error)
    {
      window.location.reload();
    }
        return (
     
          <Router>
            <div>
                <Switch>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        {' '}
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               required/>
                                {' '}
                    </div>
                   
                    <div className="form-group">
                        <label>Password: </label>
                        {' '}
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                             required/>
                              {' '}
                    </div>

                    <div className="form-group">
                    <label>Type: </label>
                    <br></br>
                    {' '}
                    <input type="radio"  name="type" checked={this.state.type=="vendor"} onChange={this.onChangeType} value="vendor"/>
                    <label for="vendor">vendor</label>
                    <br></br>
                    {' '}
                    <input type="radio"  name="type" checked={this.state.type=="customer"} onChange={this.onChangeType} value="customer"/>
                    <label for="customer">customer</label>
                    </div>
                    {' '}
                    <div className="form-group">
                    {' '}
                        < input type="submit" value="Login"   className="btn btn-primary"/>
                        {' '}
                    </div>
                    {this.state.loginSuccess && <Message message={LOGIN_MESSAGE} />}    {' '}
                  {this.state.error && <Error message={ERROR_IN_LOGIN} />}    {' '}
                </form>
                </Switch>
            </div>
            </Router>
        )
    }
}

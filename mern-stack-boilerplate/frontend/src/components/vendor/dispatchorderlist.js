import React, {Component} from 'react';
import axios from 'axios';

export default class Createvendorproduct extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
           username:JSON.parse(localStorage.getItem('user')),
           products:[]
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/orderlist')
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }    
    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>productname</th>
                            <th>Customer</th>
                            <th>Rating</th>
                            <th>Review</th>

                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentUser, i) => {
                            if(currentUser.username==this.state.username & currentUser.dispatch=="1")
                            return (
                                <tr>
                                    <td>{currentUser.name}</td>
                                    <td>{currentUser.customer}</td>
                                    <td>{currentUser.rating}</td>
                                    <td>{currentUser.review}</td>
                                    <td></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
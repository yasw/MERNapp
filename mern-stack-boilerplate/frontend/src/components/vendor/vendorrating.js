import React, {Component} from 'react';
import axios from 'axios';

export default class Vendorrating extends Component {
    
    constructor(props) {
        super(props);
        this.state = {users: [],
        username:JSON.parse(localStorage.getItem('user')),
    }
}
    componentDidMount() {
        axios.get('http://localhost:4000/orderlist')
             .then(response => {
                 this.setState({users: response.data});
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
                            <th>Productname</th>
                            <th>Customername</th>
                            <th>Rating</th>
                            <th>Review</th>

                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.users.map((currentUser, i) => {
                            if(currentUser.username==this.state.username& currentUser.status=="reviewed")
                            return (
                                <tr>
                                    <td>{currentUser.name}</td>
                                    <td>{currentUser.customer}</td>
                                    <td>{currentUser.rate}</td>
                                    <td>{currentUser.review}</td>

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
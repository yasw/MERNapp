import React, {Component} from 'react';
import axios from 'axios';

export default class Customerproductlist extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
           customer:JSON.parse(localStorage.getItem('user')),
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
                            <th>quantityordered</th>
                            <th>price</th>
                            <th>status</th>

                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentUser, i) => {
                            if(currentUser.customer==this.state.customer)
                            return (
                                <tr>
                                    <td>{currentUser.name}</td>
                                    <td>{currentUser.quantity}</td>
                                    <td>{currentUser.price}</td>
                                    <td>{currentUser.status}</td>
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
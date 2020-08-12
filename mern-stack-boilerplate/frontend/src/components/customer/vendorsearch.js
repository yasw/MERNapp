import React, {Component} from 'react';
import axios from 'axios';

export default class Vendorsearch extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            image:'',
            name: '',
            price: '',
            quantity:'',
            products:[],
            customer:JSON.parse(localStorage.getItem('user')),
            username:'',
            vendorrate:'',
        }
        this.onChangename = this.onChangename.bind(this);
        this.onChangeprice = this.onChangeprice.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onChangeimage = this.onChangeimage.bind(this);
        this.onChangeusername = this.onChangeusername.bind(this);
    }
    
    onChangename(event) {
        this.setState({ name: event.target.value });
    }
    onChangeusername(event) {
        this.setState({ username: event.target.value });
        var suma=0;
        for (var i=0;i< this.state.vendorlist.length;i++)
        {
            //console.log(this.state.products[i].quantity);
            console.log("hi");
            if( this.state.vendorlist[i].username==event.target.value)
            { 
                suma=this.state.vendorlist[i].rating;
                console.log("hii");

            }
        } 
        this.setState({vendorrate:suma});  
        console.log(suma);
    }
    onChangeprice(event) {
        this.setState({ price: event.target.value });
    }
    onChangequantity(event) {
        this.setState({ quantity: event.target.value });
    }
    onChangeimage(event) {
        this.setState({ image: event.target.value });
    }
   
    componentDidMount() {
        axios.get('http://localhost:4000/orderlist')
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
             axios.get('http://localhost:4000/vendorlist')
             .then(response => {
                 this.setState({vendorlist: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    } 
    

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Vendor: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeusername}
                               required/>
                    </div>  
                    <div className="form-group">
                        <label>Vendor Rating:{this.state.vendorrate} </label>
                    </div>    
                             
                </form>
                <div>
                <table className="table table-striped">
            <thead>
        <tr>
            <th>vendor</th>
            <th>productname</th>
            <th>customer</th>
            <th>review</th>
            <th>rating</th>

        </tr>
    </thead>
    <tbody>
    { 
        this.state.products.map((currentUser, i) => {
           if(currentUser.username==this.state.username&&currentUser.status=="reviewed")
            { 
            return (
                <tr>
                    <td>{currentUser.username}</td>
                    <td>{currentUser.name}</td>
                    <td>{currentUser.customer}</td>
                    <td>{currentUser.review}</td>
                    <td>{currentUser.rate}</td>

                </tr>
            )
            }
        })
    }
    </tbody>
        </table>
        </div>


            </div>
        )
    }
}

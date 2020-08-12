import React, {Component} from 'react';
import axios from 'axios';

export default class Productwaiting extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            image:'',
            name: '',
            price: '',
            quantity:'',
            products:[],
            vendoritem:[],
            customer:JSON.parse(localStorage.getItem('user')),
            username:'',
            search:'',
            vendorquantity:'',
            vendorproducts:'',
            customerbeforequantity:''
        }
        this.onChangename = this.onChangename.bind(this);
        this.onChangeprice = this.onChangeprice.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onChangeusername = this.onChangeusername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.editoption=this.editoption.bind(this);
    }
    
    onChangename(event) {
        this.setState({ name: event.target.value });
    }
    onChangeusername(event) {
        this.setState({ username: event.target.value });
    }
    onChangeprice(event) {
        this.setState({ price: event.target.value });
    }
    onChangequantity(event) {
        this.setState({ quantity: event.target.value });
    }
  
   
    componentDidMount() {
        axios.get('http://localhost:4000/orderlist')
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
             axios.get('http://localhost:4000/productlist')
             .then(response => {
                 this.setState({vendorproducts: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
            } 
    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.vendoritem);
        var leftquantity=parseInt(this.state.vendorquantity);
         leftquantity=leftquantity+parseInt(this.state.customerbeforequantity);
        var asked=parseInt(this.state.quantity);
        console.log(asked);
        console.log(leftquantity);
        const newUser = {
            quantity: this.state.quantity,
            customer:JSON.parse(localStorage.getItem('user')),
            name:this.state.name,
            username:this.state.username,
            status:"waiting"
        }
        const newUser2 = {
            quantity: this.state.quantity,
            customer:JSON.parse(localStorage.getItem('user')),
            name:this.state.name,
            username:this.state.username,
            status:"waiting"
        }
        if(leftquantity>=asked)
        {
        axios.post('http://localhost:4000/editorder', newUser)
             .then(res => console.log(res.data));
             newUser2.quantity=leftquantity-asked;
             console.log(newUser.quantity);
              axios.post(axios.post('http://localhost:4000/editquantity', newUser2)
                .then(res => console.log(res.data)));
        }
        if(leftquantity==asked)
        {
            newUser.status2="placed";
            axios.post(axios.post('http://localhost:4000/editstatusoforder', newUser)
                .then(res => console.log(res.data)));
        }
      window.location.reload();
        
    }
    editoption(e){  
        e.preventDefault();
        console.log(e.target.id);
        this.setState({name:this.state.products[e.target.id]["name"]});
        this.setState({username:this.state.products[e.target.id]["username"]});
        var quantifier=0;
        var name=this.state.products[e.target.id]["name"];
        var username=this.state.products[e.target.id]["username"];
        var images="";
        for (var i=0;i< this.state.vendorproducts.length;i++)
         {
             //console.log(this.state.products[i].quantity);
             if(name==this.state.vendorproducts[i].name & this.state.vendorproducts[i].username==username)
             { 
                 quantifier=this.state.vendorproducts[i].quantity;
                images=this.state.vendorproducts[i].image;
                 // break;
             }
         }
         this.setState({vendorquantity:quantifier});
         this.setState({customerbeforequantity:this.state.products[e.target.id]["quantity"]});
         this.setState({image:images});
      }
    render() {
       
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Productname:{this.state.name}</label>
                    </div>  
                    <div className="form-group">
                        <label>Vendor:{this.state.username}</label>
                    </div>  
                    
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="int" 
                               className="form-control" 
                               value={this.state.quantity}
                               onChange={this.onChangequantity}
                               required/>
                    </div>  
                    <div className="form-group">
                        <p >VendorQuantityleft:{this.state.vendorquantity}</p>
                    </div>  
                   
                    <div className="form-group">
                        <input type="submit" value="Add" className="btn btn-primary"/>
                    </div>
                </form>
                <div>
                <table className="table table-striped">
            <thead>
        <tr>
            <th>editoption</th>
            <th>username</th>
            <th>productname</th>
            <th>quantity</th>
            <th>status</th>

        </tr>
    </thead>
    <tbody>
    { 
        this.state.products.map((currentUser, i) => {
            if(currentUser.customer==this.state.customer & currentUser.status =="waiting")
            { 
            return (
            
               <tr>
                    <td> <button onClick={this.editoption} value="edit" id={i} >edit</button></td>
                    <td>{currentUser.username}</td>
                    <td>{currentUser.name}</td>
                    <td>{currentUser.quantity}</td>
                    <td>{currentUser.status}</td>
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

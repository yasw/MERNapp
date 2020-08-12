import React, {Component} from 'react';
import axios from 'axios';

export default class Customerrate extends Component {
    
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
            customerbeforequantity:'',
            rate:'',
            review:'',
            vendorsum:'',
            vendornumber:'',
            orderid:''
        }
        this.onChangename = this.onChangename.bind(this);
        this.onChangeprice = this.onChangeprice.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onChangeusername = this.onChangeusername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.editoption=this.editoption.bind(this);
        this.onChangerate = this.onChangerate.bind(this);
        this.onChangereview = this.onChangereview.bind(this);

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
    onChangereview(event) {
        this.setState({ review: event.target.value });
    }
     onChangerate(event) {
        this.setState({ rate: event.target.value });
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
                 this.setState({vendorproducts: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
            } 
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            review: this.state.review,
            customer:JSON.parse(localStorage.getItem('user')),
            rate:this.state.rate,
            username:this.state.username,
            name:this.state.name,
            status:"reviewed",
            status2:"dispatched",
            id:this.state.orderid
        }
       
        var ans=parseInt(this.state.vendorsum)+parseInt(this.state.rate);
        var number=parseInt(this.state.vendornumber)+1;
        var avg=ans/number;
        axios.post('http://localhost:4000/addreviewandrating', newUser)
             .then(res => console.log(res.data));
        const newUser2 = {
                name:this.state.name,
                username:this.state.username,
                rating:avg,
                sum:ans,
                number:number
            }
              axios.post(axios.post('http://localhost:4000/editratingvendor', newUser2)
                .then(res => console.log(res.data)));
     window.location.reload();
        
    }
    editoption(e){  
        e.preventDefault();
        console.log(e.target.id);
        this.setState({name:this.state.products[e.target.id]["name"]});
        this.setState({username:this.state.products[e.target.id]["username"]});
        this.setState({orderid:this.state.products[e.target.id]["_id"]});
        var suma=0;
        var number=0;
        var name=this.state.products[e.target.id]["name"];
        var username=this.state.products[e.target.id]["username"];
        for (var i=0;i< this.state.vendorproducts.length;i++)
         {
             //console.log(this.state.products[i].quantity);
             if( this.state.vendorproducts[i].username==username)
             { 
                 suma=this.state.vendorproducts[i].sum;
                 number=this.state.vendorproducts[i].number;
             }
         }
         this.setState({vendorsum:suma});
         this.setState({vendornumber:number});
      }
    render() {
       
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <p>Productname:{this.state.name}</p>
                    </div>  
                    <div className="form-group">
                        <p>Vendor:{this.state.username}</p>
                    </div>  
                    <div className="form-group">
                        <label>Rate: </label>
                        <input type="int" 
                               className="form-control" 
                               value={this.state.rate}
                               onChange={this.onChangerate}
                               required/>
                    </div>  
                    <div className="form-group">
                        <label>Review: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.review}
                               onChange={this.onChangereview}
                               required/>
                    </div>  
                   
                    <div className="form-group">
                        <input type="submit" value="Addreview" className="btn btn-primary"/>
                    </div>
                </form>
                <div>
                <table className="table table-striped">
            <thead>
        <tr>
            <th>editoption</th>
            <th>username</th>
            <th>productname</th>
            <th>price</th>
            <th>quantity</th>
            <th>status</th>
            <th>rating</th>

        </tr>
    </thead>
    <tbody>
    { 
        this.state.products.map((currentUser, i) => {
            if(currentUser.customer==this.state.customer & currentUser.status =="dispatched")
            { 
            return (
            
               <tr>
                    <td> <button onClick={this.editoption} value="rate" id={i} >rate</button></td>
                    <td>{currentUser.username}</td>
                    <td>{currentUser.name}</td>
                    <td>{currentUser.price}</td>
                    <td>{currentUser.quantity}</td>
                    <td>{currentUser.status}</td>
                    <td>{currentUser.rating}</td>
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

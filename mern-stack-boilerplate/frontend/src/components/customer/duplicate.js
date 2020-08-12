import React, {Component} from 'react';
import axios from 'axios';

export default class Productsearch extends Component {
    
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
            search:''
        }
        this.onChangename = this.onChangename.bind(this);
        this.onChangeprice = this.onChangeprice.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onChangesearch = this.onChangesearch.bind(this);
        this.onChangeusername = this.onChangeusername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
    onChangesearch(event) {
        this.setState({ search: event.target.value });
       var  prop=this.state.search;
        this.state.products.sort(function(a, b) {
            if (true) {
              return (parseFloat(a[prop]) > parseFloat(b[prop]) ? 1 : (parseFloat(a[prop]) < parseFloat(b[prop])) ? -1 : 0);
              //  return ( a[prop] > b[prop] ? 1 : (a[prop] < b[prop]) ? -1 : 0);

            } 
    });
    console.log(this.state.products);
    }
   
    componentDidMount() {
        axios.get('http://localhost:4000/productlist')
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    } 
    onSubmit(e) {
        e.preventDefault();
      //  console.log("hi");
    
        const newUser = {
            quantity: this.state.quantity,
            customer:JSON.parse(localStorage.getItem('user')),
            name:this.state.name,
            username:this.state.username,
            status:"waiting",
            rate:"0",
            review:'0'
        }
        const newUser2 = {
            quantity: this.state.quantity,
            customer:JSON.parse(localStorage.getItem('user')),
            name:this.state.name,
            username:this.state.username,
            status:"waiting"
        }
        var quantity=0;
       for (var i=0;i< this.state.products.length;i++)
        {
            //console.log(this.state.products[i].quantity);
            if(newUser.name==this.state.products[i].name & this.state.products[i].username==newUser.username)
            { 
                quantity=this.state.products[i].quantity;
               // break;
            }
        }
    
       // console.log(this.state.vendoritem);
        var leftquantity=parseInt(quantity);
        var asked=parseInt(this.state.quantity);
        console.log(asked);
        console.log(leftquantity);
        if(leftquantity>=asked)
        {
            newUser.quantity=this.state.quantity;
            console.log(newUser);
        axios.post('http://localhost:4000/addorder', newUser)
             .then(res => console.log(res.data));
             newUser2.quantity=leftquantity-asked;
             console.log(newUser.quantity);
              axios.post('http://localhost:4000/editquantity', newUser2)
                .then(res => console.log(res.data));
        }
        if(leftquantity==asked)
        {
            newUser.status="placed";
            axios.post(axios.post('http://localhost:4000/editstatusoforder', newUser)
                .then(res => console.log(res.data)));
        }
      window.location.reload();
        
    }

    render() {
       
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Productname: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangename}
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Vendor: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeusername}
                               required/>
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
                    <label>Type: </label>
                    <br></br>
                    {' '}
                    <input type="radio"   checked={this.state.search=="price"} onChange={this.onChangesearch} value="price"/>
                    <label for="price">price</label>
                    <br></br>
                    {' '}
                    <input type="radio"   checked={this.state.search=="quantity"} onChange={this.onChangesearch} value="quantity"/>
                    <label for="quantity">quantity</label>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add" className="btn btn-primary"/>
                    </div>
                </form>
                <div>
                <table className="table table-striped">
            <thead>
        <tr>
            <th>username</th>
            <th>productname</th>
            <th>price</th>
            <th>quantity</th>
            <th>image</th>
            <th>rating</th>

        </tr>
    </thead>
    <tbody>
    { 
        this.state.products.map((currentUser, i) => {
            if(currentUser.name==this.state.name)
            { 
            return (
                <tr>
                    <td>{currentUser.username}</td>
                    <td>{currentUser.name}</td>
                    <td>{currentUser.price}</td>
                    <td>{currentUser.quantity}</td>
                    <td>{currentUser.image}</td>
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

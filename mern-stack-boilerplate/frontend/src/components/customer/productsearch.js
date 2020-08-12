import React, {Component} from 'react';
import axios from 'axios';
import FuzzySearch from 'fuzzy-search';
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
            search:'',
            totalproducts:'',

        }
        this.onChangename = this.onChangename.bind(this);
        this.onChangeprice = this.onChangeprice.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onChangesearch = this.onChangesearch.bind(this);
        this.onChangeusername = this.onChangeusername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.editoption=this.editoption.bind(this);

    }
    
    onChangename(event) {
        console.log(this.state.products);
        this.setState({ name: event.target.value });
        const searcher = new FuzzySearch(this.state.totalproducts, ['name'], {
            caseSensitive: false,
          });
          const results = searcher.search(event.target.value);
          this.setState({products:results});
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
       var  prop=event.target.value;
      var  ans=this.state.products;
        ans.sort(function(a, b) {
            if (true) {
              return (parseFloat(a[prop]) > parseFloat(b[prop]) ? 1 : (parseFloat(a[prop]) < parseFloat(b[prop])) ? -1 : 0);
              //  return ( a[prop] > b[prop] ? 1 : (a[prop] < b[prop]) ? -1 : 0);

            } 

    });
    this.setState({ products: ans });

}
   
    componentDidMount() {
             axios.get('http://localhost:4000/productlist')
             .then(response => {
                 this.setState({totalproducts: response.data});
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
        var price=0;
       for (var i=0;i< this.state.products.length;i++)
        {
            //console.log(this.state.products[i].quantity);
            if(newUser.name==this.state.products[i].name & this.state.products[i].username==newUser.username)
            { 
                quantity=this.state.products[i].quantity;
                price=this.state.products[i].price;
               // break;
            }
        }
        newUser.price=price;
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
            <th>add</th>
            <th>username</th>
            <th>productname</th>
            <th>price</th>
            <th>quantity</th>
            <th>image</th>
        </tr>
    </thead>
    <tbody>
    { 
        this.state.products.map((currentUser, i) => {

            return (
                <tr>
                    <td> <button onClick={this.editoption} value="rate" id={i} >Addtocart</button></td>
                    <td>{currentUser.username}</td>
                    <td>{currentUser.name}</td>
                    <td>{currentUser.price}</td>
                    <td>{currentUser.quantity}</td>
                    <td><img src={currentUser.image}></img></td>
                </tr>
            )
        })
    }
    </tbody>
        </table>
        </div>


            </div>
        )
    }
}

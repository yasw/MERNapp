import React, {Component} from 'react';
import axios from 'axios';

export default class Dispatch extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            image:'',
            name: '',
            price: '',
            products:[],
            username:JSON.parse(localStorage.getItem('user')),

        }
        this.onChangename = this.onChangename.bind(this);
        this.onChangeprice = this.onChangeprice.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onChangeimage = this.onChangeimage.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangename(event) {
        this.setState({ name: event.target.value });
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
        console.log("hi");
    
        const newUser = {
            username:JSON.parse(localStorage.getItem('user')),
            name:this.state.name,
            status:"cancelled", 
        }
        var quantity=0;
        for (var i=0;i< this.state.products.length;i++)
         {
             //console.log(this.state.products[i].quantity);
             if(newUser.name==this.state.products[i].name & this.state.products[i].username==newUser.username)
             { 
                 quantity=this.state.products[i].order;
                // break;
             }
         }
         


        console.log("hi");
        console.log(newUser);
        axios.post('http://localhost:4000/statuscancel', newUser)
             .then(res => console.log(res.data));
             newUser.order=quantity;

       // window.location.reload();
       axios.post('http://localhost:4000/updatequantityvendor', newUser)
              .then(res => console.log(res.data));

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
                        <input type="submit" value="Cancelorder" className="btn btn-primary"/>
                    </div>
                </form>
                <div>
                <table className="table table-striped">
            <thead>
        <tr>
            <th>productname</th>
            <th>price</th>
            <th>quantity</th>

        </tr>
    </thead>
    <tbody>
    { 
        this.state.products.map((currentUser, i) => {
            if(currentUser.username==this.state.username)
            { 
            return (
                <tr>
                    <td>{currentUser.name}</td>
                    <td>{currentUser.price}</td>
                    <td>{currentUser.quantity}</td>

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

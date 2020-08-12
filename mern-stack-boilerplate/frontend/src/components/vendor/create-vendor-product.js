import React, {Component} from 'react';
import axios from 'axios';
import ProductService from './../../service/ProductService';
import Message from '../../basic/Message';
import Error from '../../basic/Error';
export default class Createvendorproduct extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            image:'',
            name: '',
            price: 0,
            quantity:0,
            registerSucess:false,

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
    onSubmit =async e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            image: this.state.image,
            price: this.state.price,
            quantity: this.state.quantity,
            username:JSON.parse(localStorage.getItem('user')),
            order:this.state.quantity,
            sum:'0',
            number:'0',
            rating:'0'
        }
        const loginResult =  await ProductService(newUser);
        console.log(loginResult)
        if(loginResult!=200)
        {
        axios.post('http://localhost:4000/vendoraddproduct', newUser)
             .then(res => console.log(res.data));
        this.setState(
            {
                    registerSucess:true,
                    error:false
            }
        );
        }
        else{
            this.setState(
                {
                        registerSucess:false,
                        error:true
                }
            );
        }
        this.setState({
            name: '',
            price: '',
            quantity:'',
            image:''
        });
        
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
                        <label>Price: </label>
                        <input type="int" 
                               className="form-control" 
                               value={this.state.price}
                               onChange={this.onChangeprice}
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
                        <label>ImageUrl: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.image}
                               onChange={this.onChangeimage}
                             />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary"/>
                    
                    </div>
                    {this.state.registerSucess && <Message message="Created Sucessfully" />}    {' '}
                  {this.state.error && <Error message="Error inCreattion already a product exists" />}    {' '}
                </form>
            </div>
        )
    }
}
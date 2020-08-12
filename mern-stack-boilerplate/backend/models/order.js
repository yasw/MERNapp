const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Order = new Schema({
    username:{
        type:String
    },
    name: {
        type: String
    },
    price: {
        type: String
    },
    quantity:{
        type:String
    },
    image:{
        type:String
    },
    customer:{
        type:String
    },
    status:{
        type:String
    },
    rate:{
        type:String
    },
    review:{
        type:String
    }
 
});

module.exports = mongoose.model('Order', Order);
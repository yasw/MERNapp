const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VendorProduct = new Schema({
    username:{
        type:String
    },
    name: {
        type: String
    },
    price: {
        type:String
    },
    quantity:{
        type:String
    },
    image:{
        type:String
    },
    order:{
        type:String
    },
    
    
});

module.exports = mongoose.model('VendorProduct', VendorProduct);
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vendor = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    type:{
        type:String
    },
    password:{
        type:String
    },
    sum:
    {
     type:String
    },
    number:
    {
     type:String
    },
    rating:
    {
        type:String
    } ,
});

module.exports = mongoose.model('Vendor', Vendor);






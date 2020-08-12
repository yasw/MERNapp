const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password:{
        type:String
    },
    type:{
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
module.exports = mongoose.model('Customer', Customer);






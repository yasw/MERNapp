const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
ObjectId = require('mongodb').ObjectID;
const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let Vendor = require('./models/vendor');
let Customer=require('./models/customer');
let Order=require('./models/order')
let VendorProduct=require('./models/vendorproduct')
app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    Vendor.find(function(err, users) {
        if (err) {
            console.log(err);
        }
        else{
            res.json(users)
        } 
    });
    /*Customer.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });*/
});
userRoutes.route('/vendorlist').get(function(req, res) {
    Vendor.find(function(err, users) {
        if (err) {
            console.log(err);
        }
        else{
            res.json(users)
        } 
    });
});
userRoutes.route('/customerlist').get(function(req, res) {
    Customer.find(function(err, users) {
        if (err) {
            console.log(err);
        }
        else{
            res.json(users)
        } 
    });
});
userRoutes.route('/productlist').get(function(req, res) {
    VendorProduct.find(function(err, users) {
        if (err) {
            console.log(err);
        }
        else{
            res.json(users)
        } 
    });
});
userRoutes.route('/orderlist').get(function(req, res) {
    Order.find(function(err, users) {
        if (err) {
            console.log(err);
        }
        else{
            res.json(users)
        } 
    });
});
//add product
userRoutes.route('/vendoraddproduct').post(function(req, res) {
        let user = new VendorProduct(req.body);
        user.save()
        .then(user => {
            res.status(200).json({'Product': 'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
    
   
});
// Adding a new user
userRoutes.route('/adduser').post(function(req, res) {
    if(req.body.type=="vendor")
    {
        let user = new Vendor(req.body);
        user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
    }
    if(req.body.type=="customer")
    {
        let user = new Customer(req.body);
        user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
    }
});
userRoutes.route('/addorder').post(function(req, res) {
        console.log(req.body);
        let user = new Order(req.body);
        user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
    
});
userRoutes.route('/login').post(function(req, res) {
    console.log("log")
    if(req.body.type=="vendor")
    {
    Vendor.findOne({ username: req.body.username,password:req.body.password})
        .then(user => {
            console.log(user["_id"])
            if (!user) 
            res.sendStatus(204);
           
            // console.log(user)
           else
           {

                res.sendStatus(200) ; 
            }
            })
            .catch(err => {
                res.status(400);
        });
    }
    if(req.body.type=="customer")
    {
        Customer.findOne({ username: req.body.username,password:req.body.password})
        .then(user => {
            console.log(user)
            if (!user) 
            res.sendStatus(204);
            
            res.sendStatus(200) ; 
            })
            .catch(err => {
                res.status(400);
        });
    
    }
});
userRoutes.route('/register').post(function(req, res) {
    console.log("log")
    if (req.body.type=="vendor")
    {
    Vendor.findOne({ username: req.body.username})
        .then(user => {
            console.log(user)
            if (!user) 
            res.sendStatus(204);
            
            res.sendStatus(200) ; 
            })
            .catch(err => {
                res.status(400);
        });
    }
    if(req.body.type=="customer")
    {
        Customer.findOne({ username: req.body.username})
        .then(user => {
            console.log(user)
            if (!user) 
            res.sendStatus(204);
            
            res.sendStatus(200) ; 
            })
            .catch(err => {
                res.status(400);
        });
    }

    });
userRoutes.route('/productservice').post(function(req, res) {
        console.log("log");
        VendorProduct.findOne({ username: req.body.username,name:req.body.name})
            .then(user => {
                console.log(user)
                if (!user) 
                res.sendStatus(204);
                
                res.sendStatus(200) ; 
                })
                .catch(err => {
                    res.status(400);
            });
        });
// Getting a user by id



userRoutes.route('/deletefromproduct').post(function(req, res) {
    console.log("hi");
    VendorProduct.deleteMany({username:req.body.username,name:req.body.name}) 
    .then(user => {
        console.log(user)
        if (!user) 
        res.sendStatus(204);
        
        res.sendStatus(200) ; 
        })
        .catch(err => {
            res.status(400);
    });

  
});

userRoutes.route('/statuscancel').post(function(req, res) {
    console.log("hi");
    Order.updateMany({username:req.body.username,name:req.body.name},{status:req.body.status})
    .then(user => {
        console.log(user)
        if (!user) 
        res.sendStatus(204);
        
        res.sendStatus(200) ; 
        })
        .catch(err => {
            res.status(400);
    });

  
});
userRoutes.route('/updateorder').post(function(req, res) {
    VendorProduct.updateMany({name:req.body.name},{quantity:req.body.order})
    .then(user => {
        console.log(user)
        if (!user) 
        res.sendStatus(204);
        
        res.sendStatus(200) ; 
        })
        .catch(err => {
            res.status(400);
    });

  
});
userRoutes.route('/updateorderstatus').post(function(req, res) {
    Order.updateMany({name:req.body.name,username:req.body.username,status:req.body.status2},{status:req.body.status})
    .then(user => {
        console.log(user)
        if (!user) 
        res.sendStatus(204);
        
        res.sendStatus(200) ; 
        })
        .catch(err => {
            res.status(400);
    });

  
});
userRoutes.route('/updatequantityvendor').post(function(req, res) {
    console.log(req);
    VendorProduct.updateMany({name:req.body.name,username:req.body.username},{quantity:req.body.order})
    .then(user => {
        console.log(user)
        if (!user) 
        res.sendStatus(204);
        
        res.sendStatus(200) ; 
        })
        .catch(err => {
            res.status(400);
    });

  
});
userRoutes.route('/editstatusoforder').post(function(req, res) {
    Order.updateMany({name:req.body.name,username:req.body.username,status:req.body.status},{status:req.body.status2})
    .then(user => {
        console.log(user)
        if (!user) 
        res.sendStatus(204);
        
        res.sendStatus(200) ; 
        })
        .catch(err => {
            res.status(400);
    });

  
});
userRoutes.route('/editorder').post(function(req, res) {
    Order.updateMany({name:req.body.name,username:req.body.username,customer:req.body.customer},{quantity:req.body.quantity})
    .then(user => {
        console.log(user)
        if (!user) 
        res.sendStatus(204);
        
        res.sendStatus(200) ; 
        })
        .catch(err => {
            res.status(400);
    });

  
});
userRoutes.route('/addreviewandrating').post(function(req, res) {
    console.log(req.body.id);
    Order.updateMany({ _id:ObjectId(req.body.id)},{rate:req.body.rate,review:req.body.review,status:req.body.status})
    .then(user => {
        console.log(user)
        if (!user) 
        res.sendStatus(204);
        
        res.sendStatus(200) ; 
        })
        .catch(err => {
            res.status(400);
    });

  
});
/*userRoutes.route('/addreviewandrating').post(function(req, res) {
    Order.updateMany({name:req.body.name,username:req.body.username,customer:req.body.customer,status:req.body.status2},{rate:req.body.rate,review:req.body.review,status:req.body.status})
    .then(user => {
        console.log(user)
        if (!user) 
        res.sendStatus(204);
        
        res.sendStatus(200) ; 
        })
        .catch(err => {
            res.status(400);
    });

  
});*/
userRoutes.route('/editquantity').post(function(req, res) {
    VendorProduct.updateMany({name:req.body.name,username:req.body.username},{quantity:req.body.quantity})
    .then(user => {
        console.log(user)
        if (!user) 
        res.sendStatus(204);
        
        res.sendStatus(200) ; 
        })
        .catch(err => {
            res.status(400);
    });

  
});
userRoutes.route('/editratingvendor').post(function(req, res) {
    Vendor.updateMany({username:req.body.username},{sum:req.body.sum,number:req.body.number,rating:req.body.rating})
    .then(user => {
        console.log(user)
        if (!user) 
        res.sendStatus(204);
        
        res.sendStatus(200) ; 
        })
        .catch(err => {
            res.status(400);
    });

  
});



app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});

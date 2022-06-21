const express = require('express');
const app = express();
// morgan is a Node. js and Express middleware to log HTTP requests and error
const morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 

// api routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');

mongoose.connect('mongodb+srv://node-shop:KsQ0Vak47CkrqdWw@cluster0.9uvwv.mongodb.net/myshop?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })

mongoose.Promise = global.Promise;

// Morgan HTTP request level Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{ 
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Authorization');
    if(req.method === 'OPTION'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
})

// middleware   //Routes should handle requests
app.use('/products',productRoutes);
app.use('/order',orderRoutes);

app.use((req , res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;
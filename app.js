require("dotenv").config();
const express = require("express");
var bodyParser = require('body-parser');
const userRoute = require("./api/routes/users_route");
const categoryRoute = require("./api/routes/category_route");
const productRoute = require("./api/routes/products_route");
const cartRoute = require("./api/routes/cart_route");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS errors
app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
        return res.status(200).json();
    }
    next();
});

app.use('/api/users', userRoute);
app.use('/api/category', categoryRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);

app.listen(process.env.SERVER_PORT, () => { console.log("server running")});
require("dotenv").config();
const express = require("express");
var bodyParser = require('body-parser');
const userRoute = require("./api/routes/users_route.js");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/users', userRoute);

app.listen(process.env.SERVER_PORT, () => { console.log("server running")});
const express = require("express");
const productsController = require("../controllers/products_controller");
const router = express.Router();
const validate = require("../../auth/validateToken.js");



const express = require("express");
const productsController = require("../controllers/products_controller");
const router = express.Router();
const validate = require("../../auth/validateToken.js");


router.post('/', validate._validateToken, productsController._createProduct);
router.post('/save-product-from-category/:id', validate._validateToken, productsController._createProductFromCategory);


module.exports = router;
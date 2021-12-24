const express = require("express");
const productsController = require("../controllers/products_controller");
const router = express.Router();
const validate = require("../../auth/validateToken.js");


router.post('/', validate._validateToken, productsController._createProduct);
router.post('/save-product-from-category/:id', validate._validateToken, productsController._createProductFromCategory);
router.get('/all', productsController._getAllProducts);
router.get('/expired', productsController._getExpiredProducts);
router.get('/active', productsController._getActiveProducts);


module.exports = router;
const express = require("express");
const { body } = require('express-validator');
const productsController = require("../controllers/products_controller");
const router = express.Router();
const validate = require("../../auth/validateToken.js");


router.post('/',
    // validation
    body("CategoryId", "CategoryId should not be empty and must have valuue more than 1").notEmpty().isInt({min: 1}),
    body("ProductName", "ProductName should not be empty and should be more than 3").notEmpty().isLength({ min: 3 }),
    body("SellingPrice", "SellingPrice should not be empty and must have valuue more than 10").notEmpty().isFloat({min : 10}),
    body("StockLevel", "SellingPrice should not be empty and must have valuue more than 1").notEmpty().isInt({min : 1}),
    body("Discount", "Invalid discount and must have valuue more than 1").isInt({min : 1}),
    body("ShippingPercentage", "Invalid shipping percentage and must have valuue more than 1").isInt({min : 1}),
    body("ProductImages", "ProductImages shpould not be empty").notEmpty(),
    body("ExpiredAt", "ExpiredAt should not be empty and must be in date format YYYY-MM-DD").notEmpty().isDate(),
    validate._validateToken, productsController._createProduct);



router.post('/save-product-from-category/:id',

    // validation
    body("ProductName", "ProductName should not be empty and should be more than 3").notEmpty().isLength({ min: 3 }),
    body("SellingPrice", "SellingPrice should not be empty and must have valuue more than 10").notEmpty().isFloat({ min: 10 }),
    body("StockLevel", "SellingPrice should not be empty and must have valuue more than 1").notEmpty().isInt({ min: 1 }),
    body("Discount", "Invalid discount and must have valuue more than 1").isInt({ min: 1 }),
    body("ShippingPercentage", "Invalid shipping percentage and must have valuue more than 1").isInt({ min: 1 }),
    body("ProductImages", "ProductImages shpould not be empty").notEmpty(),
    body("ExpiredAt", "ExpiredAt should not be empty and must be in date format YYYY-MM-DD").notEmpty().isDate(),
    validate._validateToken, productsController._createProductFromCategory);



router.get('/', productsController._getProducts);
router.get('/product-details', productsController._getProductsDetails);


router.put('/edit/:id',
    // validation
    body("CategoryId", "CategoryId should not be empty and must have value more than 1").notEmpty().isInt({ min: 1 }),
    body("ProductName", "ProductName should not be empty and should be more than 3").notEmpty().isLength({ min: 3 }),
    body("SellingPrice", "SellingPrice should not be empty and must have value more than 10").notEmpty().isFloat({ min: 10 }),
    body("StockLevel", "SellingPrice should not be empty and must have value more than 1").notEmpty().isInt({ min: 1 }),
    body("Discount", "Invalid discount and must have value more than 1").isInt({ min: 1 }),
    body("ShippingPercentage", "Invalid shipping percentage and must have value more than 1").isInt({ min: 1 }),
    body("ProductImages", "ProductImages shpould not be empty").notEmpty(),
    body("ExpiredAt", "ExpiredAt should not be empty and must be in date format YYYY-MM-DD").notEmpty().isDate(),
    validate._validateToken, productsController._updateProduct);


router.delete('/delete/:id', validate._validateToken, productsController._deleteProduct);


module.exports = router;
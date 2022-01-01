const express = require("express");
const { body } = require('express-validator');
const cartController = require("../controllers/cart_controller");
const router = express.Router();
const validate = require("../../auth/validateToken");

router.post('/:id',
    body("Qty", "Qty should not be empty and must have value more than 1").notEmpty().isInt({ min: 1 }),
    body("UserId", "ProductName should not be empty and must have value more than 1").notEmpty().isInt({ min: 1 }),
    validate._validateToken, cartController._createCart);


router.put('/edit/:id',
    body("Qty", "Qty should not be empty and must have value more than 1").notEmpty().isInt({ min: 1 }),
    validate._validateToken, cartController._updateCart);


router.delete('/delete/:id', validate._validateToken, cartController._deleteCart);


router.get('/mycart/:id', validate._validateToken, cartController._getUserCart);

module.exports = router;
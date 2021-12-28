const express = require("express");
const cartController = require("../controllers/cart_controller");
const router = express.Router();
const validate = require("../../auth/validateToken");

router.post('/:id', validate._validateToken, cartController._createCart);
router.put('/edit/:id', validate._validateToken, cartController._updateCart);
router.delete('/delete/:id', validate._validateToken, cartController._deleteCart);
router.get('/mycart/:id', validate._validateToken, cartController._getUserCart);

module.exports = router;
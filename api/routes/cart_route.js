const express = require("express");
const cartController = require("../controllers/cart_controller");
const router = express.Router();
const validate = require("../../auth/validateToken");

router.post('/', cartController._createCart);

module.exports = router;
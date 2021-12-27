const express = require("express");
const cartController = require("../controllers/cart_controller");
const router = express.Router();
const validate = require("../../auth/validateToken");

router.post('/:id', cartController._createCart);
router.put('/edit/:id', cartController._updateCart);
router.delete('/delete/:id', cartController._deleteCart);

module.exports = router;
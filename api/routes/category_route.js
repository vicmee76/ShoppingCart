const express = require("express");
const { body } = require('express-validator');
const categoryController = require("../controllers/category_controller.js");
const router = express.Router();
const validate = require("../../auth/validateToken.js");

router.post('/',
    //validation
    body("CategoryName", "CategoryName should not be empty and should be more than 3").notEmpty().isLength({ min: 3 }),
    validate._validateToken, categoryController._saveCategory);

router.get('/all', categoryController._getCategories);

router.get('/view/:id', categoryController._getCategoryById);

router.get('/products/:id', categoryController._getCategoryProducts);

router.put('/edit/:id',
    //validation
    body("CategoryName", "CategoryName should not be empty and should be more than 3").notEmpty().isLength({ min: 3 }),
    validate._validateToken, categoryController._updateCategory);

router.delete('/delete/:id', validate._validateToken, categoryController._deleteCategory);

module.exports = router;
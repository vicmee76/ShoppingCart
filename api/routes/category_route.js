const express = require("express");
const { body } = require('express-validator');
const categoryController = require("../controllers/category_controller.js");
const router = express.Router();
const validate = require("../../auth/validateToken.js");


// create a category
router.post('/',
   // input validation
    body("CategoryName", "CategoryName should not be empty and should be more than 3").notEmpty().isLength({ min: 3 }),
    validate._validateToken, categoryController._saveCategory);


// get all categories
router.get('/all', categoryController._getCategories);


// get all category by id
router.get('/view/:id', categoryController._getCategoryById);


// get all products in a category
router.get('/products/:id', categoryController._getCategoryProducts);


// update a category
router.put('/edit/:id',
    // input validation
    body("CategoryName", "CategoryName should not be empty and should be more than 3").notEmpty().isLength({ min: 3 }),
    validate._validateToken, categoryController._updateCategory);


// delete a category
router.delete('/delete/:id', validate._validateToken, categoryController._deleteCategory);

module.exports = router;
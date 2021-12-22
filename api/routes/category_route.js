const express = require("express");
const categoryController = require("../controllers/category_controller.js");
const router = express.Router();
const validate = require("../../auth/validateToken.js");

router.post('/', validate._validateToken, categoryController._saveCategory);
router.get('/all', categoryController._getCategories);
router.get('/view/:id', categoryController._getCategoryById);
router.put('/edit/:id', validate._validateToken, categoryController._updateCategory);
router.delete('/delete/:id', validate._validateToken, categoryController._deleteCategory);

module.exports = router;
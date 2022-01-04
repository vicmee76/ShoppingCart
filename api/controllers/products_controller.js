const helpers = require("../../helpers/helpers");
const dateShortcode = require('date-shortcode');
const { validationResult } = require('express-validator');

const {
    saveProduct,
    saveProductFromCategory,
    checkExistingProduct,
    getProducts,
    checkProductById,
    updateProduct,
    deleteProduct,
} = require("../services/products_services.js");

// Default way to create a product
exports._createProduct = async (req, res) => {

    try {
        const data = req.body;
        const id = data.CategoryId;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const checkProduct = await checkExistingProduct(id, data);

        if (checkProduct && checkProduct.length > 0) {

            const date = dateShortcode.parse('{YYYY-MM-DD}', new Date());
            let produtExpiry = dateShortcode.parse('{YYYY-MM-DD}', checkProduct[0].ExpiredAt);
            let dataExpiryDate = dateShortcode.parse('{YYYY-MM-DD}', data.ExpiredAt);

            // checking if a product has expired
            if (date > produtExpiry && dataExpiryDate > date) {

                if (checkProduct[0].ProductName === data.ProductName && checkProduct[0].CategoryId === data.CategoryId && dataExpiryDate >= date) {
                    helpers._showError(409, res, "This product already exits for this category.");
                }
                else {
                    const save = await saveProduct(data);
                    helpers._showSuccess(201, res, "Product created successfully", save);
                }
            }
            else {
                helpers._showError(409, res, "This product already exits for this category.");
            }
        }
        else {
            const save = await saveProduct(data);
            helpers._showSuccess(201, res, "Product created successfully", save);
        }
    }
    catch (e) {
        helpers._showError(500, res, e);
    }
};



// create product from a category link
exports._createProductFromCategory = async (req, res) => {

    try {
        const data = req.body;
        const categoryId = req.params.id;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const checkProduct = await checkExistingProduct(categoryId, data);

        if (checkProduct && checkProduct.length > 0) {

            const date = dateShortcode.parse('{YYYY-MM-DD}', new Date());
            let produtExpiry = dateShortcode.parse('{YYYY-MM-DD}', checkProduct[0].ExpiredAt);
            let dataExpiryDate = dateShortcode.parse('{YYYY-MM-DD}', data.ExpiredAt);

            // checking if a product has expired
            if (date > produtExpiry && dataExpiryDate > date) {

                if (checkProduct[0].ProductName === data.ProductName && checkProduct[0].CategoryId === categoryId && dataExpiryDate >= date) {
                    helpers._showError(409, res, "This product already exits for this category.");
                }
                else {
                    const save = await saveProductFromCategory(categoryId, data);
                    helpers._showSuccess(201, res, "Product created successfully", save);
                }
            }
            else {
                helpers._showError(409, res, "This product already exits for this category.");
            }
        }
        else {
            const save = await saveProductFromCategory(categoryId, data);
            helpers._showSuccess(201, res, "Product created successfully", save);
        }
    }
    catch (e) {
        helpers._showError(500, res, e);
    }

};



exports._getProducts = async (req, res) => {

    try {
        option = req.query.option;
        categoryId = req.query.id;

        const gets = await getProducts(categoryId, option);
        console.log(gets);
        if (gets && gets.length > 0) {
            helpers._showProducts(200, res, option.toUpperCase() + " products found", gets, option);
        }
        else {
            helpers._showError(404, res, "Products not found");
        }
    }
    catch (e) {
        helpers._showError(500, res, e);
    }
};



exports._getProductsDetails = async (req, res) => {

    try {
        option = req.query.option;
        productId = req.query.id;

        const get = await getProducts(productId, option);

        if (get && get.length > 0) {
            helpers._showSingleProducts(200, res, "Product found", get, option);
        }
        else {
            helpers._showError(404, res, "Products not found");
        }
    }
    catch (e) {
        helpers._showError(500, res, e);
    }
};



exports._updateProduct = async  (req, res) => {

    try {
        const productId = req.params.id;
        const data = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const check = await checkProductById(productId);

        if (check && check.length > 0) {
            const update = await updateProduct(productId, data);
            if (update) {
                helpers._showSuccess(201, res, "Product updated successfully", update);
            }
            else {
                helpers._showError(304, res, "Not modified, something went wrong");
            }
        }
        else {
            helpers._showError(404, res, "Product not found");
        }
    }
    catch (e) {
        helpers._showError(500, res, e);
    }
};



exports._deleteProduct =  async (req, res) => {

    try {
        const productId = req.params.id;
        const check = await checkProductById(productId);

        if (check && check.length > 0) {
            const del = await deleteProduct(productId);
            if (del) {
                helpers._showSuccess(200, res, "Product deleted successfully", del);
            }
            else {
                helpers._showError(501, res, "Something went wrong " + err);
            }
        }
        else {
            helpers._showError(404, res, "Product cannot be found");
        }
    }
    catch (e) {
        helpers._showError(500, res, e);
    }

}

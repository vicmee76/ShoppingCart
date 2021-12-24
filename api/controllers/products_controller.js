const helpers = require("../../helpers/helpers");
const dateShortcode = require('date-shortcode');

const {
    saveProduct,
    saveProductFromCategory,
    checkExistingProduct,
    getProducts,
    checkProductById,
    updateProduct,
    deleteProduct
} = require("../services/products_services.js");


exports._createProduct = (req, res, next) => {

    const data = req.body;
    const id = data.CategoryId;

    checkExistingProduct(id, data, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {

                const date = dateShortcode.parse('{YYYY-MM-DD}', new Date());
                let produtExpiry = dateShortcode.parse('{YYYY-MM-DD}', results[0].ExpiredAt);

                if (date > produtExpiry) {
                    saveProduct(data, (errs, response) => {
                        if (errs) {
                            helpers._showError(500, res, errs);
                        }
                        else {
                            helpers._showSuccess(201, res, "Product created successfully", response);
                        }
                    });
                }
                else {
                    helpers._showError(409, res, "This product already exits for this category.");
                }
            }
            else {
                saveProduct(data, (errs, response) => {
                    if (errs) {
                        helpers._showError(500, res, errs);
                    }
                    else {
                        helpers._showSuccess(201, res, "Product created successfully", response);
                    }
                });
            }
        }
    });

};


exports._createProductFromCategory = (req, res, next) => {

    const data = req.body;
    const id = req.params.id;

    checkExistingProduct(id, data, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {

                const date = dateShortcode.parse('{YYYY-MM-DD}', new Date());
                let produtExpiry = dateShortcode.parse('{YYYY-MM-DD}', results[0].ExpiredAt);

                if (date > produtExpiry) {
                    saveProductFromCategory(id, data, (errs, response) => {
                        if (errs) {
                            helpers._showError(500, res, errs);
                        }
                        else {
                            helpers._showSuccess(201, res, "Product created successfully", response);
                        }
                    });
                }
                else {
                    helpers._showError(409, res, "This product already exits for this category.");
                }
            }
            else {
                saveProductFromCategory(id, data, (errs, response) => {
                    if (errs) {
                        helpers._showError(500, res, errs);
                    }
                    else {
                        helpers._showSuccess(201, res, "Product created successfully", response);
                    }
                });
            }
        }
    });
};


exports._getProducts = (req, res, next) => {

    option = req.query.option;
    id = req.query.id;

    getProducts(id, option, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results) {
                helpers._showProducts(200, res, "All products found", results);
            }
            else {
                helpers._showError(404, res, "Products not found");
            }
        }
    });

};


exports._getProductsDetails = (req, res, next) => {

    option = req.query.option;
    id = req.query.id;

    getProducts(id, option, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results) {
                helpers._showSingleProducts(200, res, "All products found", results);
            }
            else {
                helpers._showError(404, res, "Products not found");
            }
        }
    });

};


exports._updateProduct = (req, res, next) => {

    const id = req.params.id;
    const data = req.body;

    checkProductById(id, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {

                updateProduct(id, data, (err, results) => {
                    if (err) {
                        helpers._showError(500, res, err);
                    }
                    else {
                        if (results) {
                            helpers._showSuccess(201, res, "Product updated successfully", results);
                        }
                        else {
                            helpers._showError(304, res, "Not modified, something went wrong");
                        }
                    }
                });
            }
            else {
                helpers._showError(404, res, "Product not found");
            }
        }
    });
};


exports._deleteProduct = (req, res, next) => {

    const id = req.params.id;

    checkProductById(id, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {
                deleteProduct(id, (err, results) => {
                    if (err) {
                        helpers._showError(500, res, err);
                    }
                    else {
                        if (results) {
                            helpers._showSuccess(200, res, "Product deleted successfully", results);
                        }
                        else {
                            helpers._showError(501, res, "Something went wrong " + err);
                        }
                    }
                });
            }
            else {
                helpers._showError(404, res, "Product cannot be found");
            }
        }
    });
}

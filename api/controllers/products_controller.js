const helpers = require("../../helpers/helpers");
const dateShortcode = require('date-shortcode');

const {
    saveProduct,
    saveProductFromCategory,
    checkExistingProduct,
    getProducts
} = require("../services/products_services.js");
const { options } = require("../routes/users_route");

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




exports._getAllProducts = (req, res, next) => {

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


exports._getExpiredProducts = (req, res, next) => {

    getProducts(null, "expired", (err, results) => {
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


exports._getActiveProducts = (req, res, next) => {

    getProducts(null, "active", (err, results) => {
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

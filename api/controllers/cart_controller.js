const helpers = require("../../helpers/helpers");

const {
    saveCart,
    getUserCart,
    updateCart,
    deleteCart,
    getExistingCart,
    geCartById
} = require("../services/cart_services");


exports._createCart = (req, res, next) => {

    const data = req.body;
    const productId = req.params.id
    let qty = data.Qty;

    getExistingCart(productId, data, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {

            if (results && results.length > 0) {
                data.Qty = results[0].Qty + qty;
                updateCart(results[0].CartId, data, (errs, response) => {
                    if (errs) {
                        helpers._showError(500, res, errs);
                    }
                    else {
                        helpers._showSuccess(201, res, "Cart updated successfully", response);
                    }
                });
            }
            else {
                saveCart(productId, data, (errs, response) => {
                    if (errs) {
                        helpers._showError(500, res, errs);
                    }
                    else {
                        helpers._showSuccess(201, res, "Added to cart successfully", response);
                    }
                });
            }
        }
    });

};


exports._updateCart = (req, res, next) => {

    const data = req.body;
    const cartId = req.params.id;

    geCartById(cartId, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {
                updateCart(cartId, data, (errs, response) => {
                    if (errs) {
                        helpers._showError(500, res, errs);
                    }
                    else {
                        helpers._showSuccess(201, res, "Cart updated successfully", response);
                    }
                });
            }
            else {
                helpers._showError(404, res, "This cart cannot be found");
            }
        }
    });

};


exports._deleteCart = (req, res, next) => {
    const cartId = req.params.id;
    geCartById(cartId, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {
                deleteCart(cartId, (errs, response) => {
                    if (errs) {
                        helpers._showError(500, res, errs);
                    }
                    else {
                        helpers._showSuccess(200, res, "Cart item deleted successfully", response);
                    }
                });
            }
            else {
                helpers._showError(404, res, "This cart cannot be found");
            }
        }
    });

};


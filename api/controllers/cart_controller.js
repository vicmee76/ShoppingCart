const helpers = require("../../helpers/helpers");

const {
    saveCart,
    getUserCart,
    updateCart,
    deleteCart,
    getExistingCart,
    geCartById,
} = require("../services/cart_services");

const {
    checkProductById,
    updateProductStock
} = require("../services/products_services");



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

                checkProductById(productId, (perr, ProductResults) => {

                    if (perr) {
                        helpers._showError(500, res, perr);
                    }
                    else {
                        if (ProductResults && ProductResults.length > 0) {

                            if (ProductResults[0].StockLevel <= 0) {
                                // no available stock
                                helpers._showError(206, res, "No available stock");
                            }
                            else if (ProductResults[0].StockLevel < qty) {
                                // stock is less than the qty needed
                                helpers._showError(303, res, "Product stock is less than the quantity needed");
                            }
                            else {

                                // add previous qty and new qty of item
                                data.Qty = results[0].Qty + qty;
                                let newStockLevel = ProductResults[0].StockLevel - qty;

                                updateCart(results[0].CartId, data, (errs, CartResponse) => {
                                    if (errs) {
                                        helpers._showError(500, res, errs);
                                    }
                                    else {
                                        updateProductStock(productId, newStockLevel, (productError, ProductResponse) => {
                                            if (productError) {
                                                helpers._showSuccess(201, res, "Cart updated successfully.", CartResponse);
                                            }
                                            else {
                                                helpers._showSuccess(201, res, "Cart & Product stock level updated successfully.", CartResponse);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                        else {
                            helpers._showError(404, res, "Product cannot be found");
                        }
                    }
                });
            }
            else {

                checkProductById(productId, (perr, ProductResults) => {

                    if (perr) {
                        helpers._showError(500, res, perr);
                    }
                    else {
                        if (ProductResults && ProductResults.length > 0) {

                            if (ProductResults[0].StockLevel <= 0) {
                                // no available stock
                                helpers._showError(204, res, "No available stock");
                            }
                            else if (ProductResults[0].StockLevel < qty) {
                                // stock is less than the qty needed
                                helpers._showError(303, res, "Product stock is less than the quantity needed");
                            }
                            else {
                                let newStockLevel = ProductResults[0].StockLevel - qty;

                                saveCart(productId, data, (errs, response) => {
                                    if (errs) {
                                        helpers._showError(500, res, errs);
                                    }
                                    else {
                                        updateProductStock(productId, newStockLevel, (productError, ProductResponse) => {
                                            if (productError) {
                                                helpers._showSuccess(201, res, "Added to cart successfully", response);
                                            }
                                            else {
                                                helpers._showSuccess(201, res, "Added to cart & Product stock level updated successfully.", response);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                        else {
                            helpers._showError(404, res, "Product cannot be found");
                        }
                    }
                });
            }
        }
    });
};



exports._updateCart = (req, res, next) => {

    const data = req.body;
    const cartId = req.params.id;
    let qty = data.Qty;

    geCartById(cartId, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {

                let productId = results[0].ProductId;

                checkProductById(productId, (perr, ProductResults) => {

                    if (perr) {
                        helpers._showError(500, res, perr);
                    }
                    else {
                        if (ProductResults && ProductResults.length > 0) {

                            var originalStock = results[0].Qty + ProductResults[0].StockLevel;

                            if (originalStock <= 0) {
                                // no available stock
                                helpers._showError(206, res, "No available stock");
                            }
                            else if (originalStock < qty) {
                                // stock is less than the qty needed
                                helpers._showError(303, res, "Product stock is less than the quantity needed");
                            }
                            else {

                                let newStockLevel = originalStock - qty;

                                updateCart(cartId, data, (errs, CartResponse) => {
                                    if (errs) {
                                        helpers._showError(500, res, errs);
                                    }
                                    else {
                                        updateProductStock(productId, newStockLevel, (productError, ProductResponse) => {
                                            if (productError) {
                                                helpers._showSuccess(201, res, "Cart updated successfully.", CartResponse);
                                            }
                                            else {
                                                helpers._showSuccess(201, res, "Cart & Product stock level updated successfully.", CartResponse);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                        else {
                            helpers._showError(404, res, "Product cannot be found");
                        }
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

                const qty = results[0].Qty;
                const productId = results[0].ProductId;
                
                deleteCart(cartId, (errs, response) => {
                    if (errs) {
                        helpers._showError(500, res, errs);
                    }
                    else {
                        checkProductById(productId, (perr, ProductResults) => {
                            if (perr) {
                                helpers._showError(500, res, perr);
                            }
                            else {
                                if (ProductResults && ProductResults.length > 0) {

                                    let newStockLevel = ProductResults[0].StockLevel + qty;
                                    updateProductStock(productId, newStockLevel, (productError, ProductResponse) => {
                                        if (productError) {
                                            helpers._showSuccess(200, res, "Cart item deleted successfully", response);
                                        }
                                        else {
                                            helpers._showSuccess(200, res, "Cart item deleted successfully", response);
                                        }
                                    });
                                }
                                else {
                                    helpers._showError(404, res, "Product cannot be found");
                                }
                            }
                        });
                    }
                });
            }
            else {
                helpers._showError(404, res, "This cart cannot be found");
            }
        }
    });

};



exports._getUserCart = (req, res, next) => {
    const userId = req.params.id;
    getUserCart(userId, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {
                helpers._showCart(200, res, "Cart items found", results);
            }
            else {
                helpers._showError(404, res, "No item for this user.");
            }
        }
    });
};


const helpers = require("../../helpers/helpers");
const { validationResult } = require('express-validator');

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



// add product to cart for a user
exports._createCart = async (req, res) => {

    try {
        const data = req.body;
        const productId = req.params.id
        let qty = data.Qty;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const check = await getExistingCart(productId, data);

        if (check && check.length > 0) {

            const ProductResults = await checkProductById(productId);

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
                    data.Qty = check[0].Qty + qty;
                    let newStockLevel = ProductResults[0].StockLevel - qty;
                    const update = await updateCart(check[0].CartId, data);

                    if (update) {
                        const updateStock = await updateProductStock(productId, newStockLevel);
                        if (updateStock) {
                            helpers._showSuccess(201, res, "Cart updated successfully.", update);
                        }
                        else {
                            helpers._showSuccess(201, res, "Cart & Product stock level updated successfully.", update);
                        }
                    }
                    else {
                        helpers._showError(500, res, "Something went wrong");
                    }
                }
            }
            else {
                helpers._showError(404, res, "Product cannot be found");
            }
        }
        else {
            const ProductResults = await checkProductById(productId);
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
                    const save = await saveCart(productId, data);

                    if (save) {
                        const update = await updateProductStock(productId, newStockLevel);
                        if (update) {
                            helpers._showSuccess(201, res, "Added to cart successfully", update);
                        }
                        else {
                            helpers._showSuccess(201, res, "Added to cart & Product stock level updated successfully.", update);
                        }
                    }
                    else {
                        helpers._showError(500, res, "Something went wrong");
                    }
                }
            }
            else {
                helpers._showError(404, res, "Product cannot be found");
            }
        }
    } catch (e) {
        helpers._showError(500, res, e);
    }
};



// update a user cart
exports._updateCart = async (req, res) => {

    try {
        const data = req.body;
        const cartId = req.params.id;
        let qty = data.Qty;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const check = await geCartById(cartId);

        if (check && check.length > 0) {

            let productId = check[0].ProductId;
            const ProductResults = await checkProductById(productId);

            if (ProductResults && ProductResults.length > 0) {

                var originalStock = check[0].Qty + ProductResults[0].StockLevel;
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
                    const update = updateCart(cartId, data);

                    if (update) {
                        const updateStock = await updateProductStock(productId, newStockLevel);
                        if (updateStock) {
                            helpers._showSuccess(201, res, "Cart updated successfully.", update);
                        }
                        else {
                            helpers._showSuccess(201, res, "Cart & Product stock level updated successfully.", update);
                        }
                    }
                    else {
                        helpers._showError(500, res, "Something went wrong");
                    }
                }
            }
            else {
                helpers._showError(404, res, "Product cannot be found");
            }
        }
        else {
            helpers._showError(404, res, "This cart cannot be found");
        }
    } catch (e) {
        helpers._showError(500, res, e);
    }
};



// delete an item from cart for a user
exports._deleteCart = async (req, res) => {

    try {
        const cartId = req.params.id;
        const check = await geCartById(cartId);

        if (check && check.length > 0) {

            const qty = check[0].Qty;
            const productId = check[0].ProductId;
            const del = await deleteCart(cartId);

            if (del) {
                const ProductResults = await checkProductById(productId);

                if (ProductResults && ProductResults.length > 0) {

                    let newStockLevel = ProductResults[0].StockLevel + qty;
                    const update = await updateProductStock(productId, newStockLevel);

                    if (update) {
                        helpers._showSuccess(200, res, "Cart item deleted successfully", update);
                    }
                    else {
                        helpers._showSuccess(200, res, "Cart item deleted successfully", update);
                    }
                }
                else {
                    helpers._showError(404, res, "Product cannot be found");
                }
            }
            else {
                helpers._showError(500, res, "Something went wrong.");
            }
        }
        else {
            helpers._showError(404, res, "This cart cannot be found");
        }
    } catch (e) {
        helpers._showError(500, res, e);
    }
};



// get cart product items for a user
exports._getUserCart = async (req, res) => {
    try {
        const userId = req.params.id;
        const get = await getUserCart(userId);

        if (get && get.length > 0) {
            helpers._showCart(200, res, "Cart items found", get);
        }
        else {
            helpers._showError(404, res, "No item for this user.");
        }
    } catch (e) {
        helpers._showError(500, res, e);
    }
};


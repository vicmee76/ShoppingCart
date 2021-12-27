const helpers = require("../../helpers/helpers");

const {
    saveCart,
    getCart,
    updateCart,
    deleteCart,
    getExistingCart
} = require("../services/cart_services");


exports._createCart = (req, res, next) => {

    const data = req.body;
    const id = req.params.id
    let qty = data.Qty;

    getExistingCart(id, data, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {

            if (results && results.length > 0) {
                data.Qty = results[0].Qty + qty;
            }

            saveCart(data, (errs, response) => {
                if (errs) {
                    helpers._showError(500, res, errs);
                }
                else {
                    helpers._showSuccess(201, res, "Added to cart successfully", response);
                }
            });
        }
    });

};


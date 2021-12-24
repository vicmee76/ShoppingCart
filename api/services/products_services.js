const pool = require("../../config/database.js");
const helpers = require("../../helpers/helpers");

let sku = helpers._generateHash();

module.exports = {

    checkExistingProduct: (id, data, callBack) => {

        pool.query("SELECT * FROM products WHERE ProductName = ? && CategoryId = ? && ExpiredAt < NOW()",
            [
                data.ProductName,
                id
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },


    saveProduct: (data, callBack) => {

        pool.query("INSERT INTO products(CategoryId, ProductName, ProductDescription, Sku, SellingPrice, Discount, StockLevel, Colors, PaymentType, ProductImages, ExpiredAt) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
            [
                data.CategoryId,
                data.ProductName,
                data.ProductDescription,
                sku,
                data.SellingPrice,
                data.Discount,
                data.StockLevel,
                data.Colors,
                data.PaymentType,
                data.ProductImages,
                data.ExpiredAt,
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },



    saveProductFromCategory: (id, data, callBack) => {

        let sku = helpers._generateHash();

        pool.query("INSERT INTO products(CategoryId, ProductName, ProductDescription, Sku, SellingPrice, Discount, StockLevel, Colors, PaymentType, ProductImages, ExpiredAt) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
            [
                id,
                data.ProductName.toUpperCase(),
                data.ProductDescription,
                sku,
                data.SellingPrice,
                data.Discount,
                data.StockLevel,
                data.Colors,
                data.PaymentType,
                data.ProductImages,
                data.ExpiredAt,
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },
}
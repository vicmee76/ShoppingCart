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


    getProducts: (id = null, option, callBack) => {

        var sql = "SELECT p.*, c.CategoryName FROM products as p LEFT JOIN categories as c ON p.CategoryId = c.CategoryId "; // get all products join the catgeory they belong to 

        if (option === "expired") {
            sql = sql + " WHERE ExpiredAt < NOW()"; // to get all expired products
        }
        else if (option === "active") {
            sql = sql + " WHERE ExpiredAt > NOW()"; // to get all non-expired products
        }
        else if (option === "category") {
            sql = sql + " WHERE CategoryId = ?"; // to get all products in a category
        }
        else if (option === "single") {
            sql = sql + " WHERE ProductId = ?"; // to get a particular product
        }

        console.log(sql);

        pool.query(sql.trim(),
            [
                id
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },
}
const pool = require("../../config/database.js");
const helpers = require("../../helpers/helpers");

let sku = helpers._generateHash();

module.exports = {

    checkExistingProduct: (id, data) => {
        return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM products WHERE ProductName = ? && CategoryId = ?",
            [
                data.ProductName,
                id
            ],
            (error, result) => {
                helpers._getResponse(error, result, resolve, reject);
            });
        });
    },


    checkProductById: (id) => {
        return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM products WHERE ProductId = ?",
            [
                id
            ],
            (error, result) => {
                helpers._getResponse(error, result, resolve, reject);
            });
        });
    },


    saveProduct: (data) => {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO products(CategoryId, ProductName, ProductDescription, Sku, SellingPrice, Discount, StockLevel, Colors, PaymentType, ProductImages, ExpiredAt, ShippingPercentage) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
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
                    data.ShippingPercentage
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },



    saveProductFromCategory: (id, data) => {
        return new Promise((resolve, reject) => {
        let sku = helpers._generateHash();
        pool.query("INSERT INTO products(CategoryId, ProductName, ProductDescription, Sku, SellingPrice, Discount, StockLevel, Colors, PaymentType, ProductImages, ExpiredAt, ShippingPercentage) VALUES(?,?,?,?,?,?,?,?,?,?,?, ?)",
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
                data.ShippingPercentage
            ],
            (error, result) => {
                helpers._getResponse(error, result, resolve, reject);
            });
        });
    },


    getProducts: (id = null, option) => {
        return new Promise((resolve, reject) => {
        var sql = "SELECT p.*, c.CategoryName FROM products as p LEFT JOIN categories as c ON p.CategoryId = c.CategoryId "; // get all products join the catgeory they belong to 

        if (option === "expired") {
            sql = sql + " WHERE p.ExpiredAt < NOW()"; // to get all expired products
        }
        else if (option === "active") {
            sql = sql + " WHERE p.ExpiredAt > NOW()"; // to get all non-expired products
        }
        else if (option === "category") {
            sql = sql + " WHERE p.CategoryId = ?"; // to get all products in a category
        }
        else if (option === "single") {
            sql = sql + " WHERE p.ProductId = ?"; // to get a particular product
        }

        pool.query(sql.trim(),
            [
                id
            ],
            (error, result) => {
                helpers._getResponse(error, result, resolve, reject);
            });
        });
    },



    updateProduct: (id, data) => {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE products SET CategoryId=?, ProductName=?, ProductDescription=?, SellingPrice=?, Discount=?, StockLevel=?, Colors=?, PaymentType=?, ProductImages=?, ExpiredAt=?, ShippingPercentage=? WHERE ProductId=?",
                [
                    data.CategoryId,
                    data.ProductName,
                    data.ProductDescription,
                    data.SellingPrice,
                    data.Discount,
                    data.StockLevel,
                    data.Colors,
                    data.PaymentType,
                    data.ProductImages,
                    data.ExpiredAt,
                    data.ShippingPercentage,
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


    updateProductStock: (id, stockLevel) => {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE products SET StockLevel=? WHERE ProductId=?",
                [
                    stockLevel,
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            pool.query("DELETE FROM products WHERE ProductId=?",
                [
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


}
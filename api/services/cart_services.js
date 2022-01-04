const pool = require("../../config/database.js");
const helpers = require("../../helpers/helpers");

module.exports = {

    getExistingCart: (id, data) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT c.*, p.StockLevel FROM cart as c LEFT JOIN products as p ON c.ProductId = p.ProductId WHERE c.UserId = ? AND p.ProductId =?",
                [
                    data.UserId,
                    id,
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


    geCartById: (id) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM cart WHERE CartId = ?",
                [
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },



    getUserCart: (id) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT cr.*, p.* FROM cart as cr LEFT JOIN products as p ON cr.ProductId = p.ProductId WHERE UserId = ?",
                [
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


    saveCart: (id, data) => {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO cart(UserId, ProductId, Qty) VALUES(?,?,?)",
                [
                    data.UserId,
                    id,
                    data.Qty,
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },



    updateCart: (id, data) => {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE cart SET Qty=? WHERE CartId=?",
                [
                    data.Qty,
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


    deleteCart: (id) => {
        return new Promise((resolve, reject) => {
            pool.query("DELETE FROM cart WHERE CartId=?",
                [
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },
}
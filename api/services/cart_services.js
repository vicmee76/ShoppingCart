const pool = require("../../config/database.js");
const helpers = require("../../helpers/helpers");

module.exports = {

    getExistingCart: (id, data, callBack) => {

        pool.query("SELECT * FROM cart WHERE UserId = ? AND ProductId =?",
            [
                id,
                data.ProductId
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },


    getCart: (id, callBack) => {

        pool.query("SELECT * FROM cart WHERE UserId = ?",
            [
                id
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },


    saveCart: (data, callBack) => {

        pool.query("INSERT INTO cart(UserId, ProductId, Qty) VALUES(?,?,?)",
            [
                data.ProductId,
                data.UserId,
                data.Qty,
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },



    updateCart: (id, data, callBack) => {

        pool.query("UPDATE cart SET Qty=? WHERE CartId=?",
            [
                data.Qty,
                id
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },



    deleteCart: (id, callBack) => {
        pool.query("DELETE FROM cart WHERE CartId=?",
            [
                id
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },


}
const pool = require("../../config/database.js");
const helpers = require("../../helpers/helpers");

module.exports = {

    saveCategory: (data, callBack) => {

        pool.query("INSERT INTO categories(CategoryName, CategoryDescription, CategoryImage) values(?,?,?)",
            [
                data.CategoryName.toUpperCase(),
                data.CategoryDescription,
                data.CategoryImage,
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },


    checkExisitingCategory: (id = null, data = null, callBack) => {

        pool.query("SELECT CategoryName FROM categories WHERE CategoryName=? OR CategoryId=?",
            [
                data.CategoryName.toUpperCase(),
                id
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },


    getCategories: (callBack) => {

        pool.query("SELECT c.CategoryId, c.CategoryName, COUNT(p.ProductId) as ProductCount FROM categories as c LEFT JOIN products as p on c.CategoryId = p.CategoryId  GROUP BY c.CategoryId, c.CategoryName",
            [
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },


    getCategoriesById: (id, callBack) => {

        pool.query("SELECT c.*, COUNT(p.ProductId) as ProductCount FROM categories as c LEFT JOIN products as p on c.CategoryId = p.CategoryId WHERE c.CategoryId=? GROUP BY c.CategoryId",
            [
                id
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },


    updateCategory: (id, data, callBack) => {

        pool.query("UPDATE categories SET CategoryName=?, CategoryDescription=?, CategoryImage=? WHERE CategoryId=?",
            [
                data.CategoryName.toUpperCase(),
                data.CategoryDescription,
                data.CategoryImage,
                id
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },


    deleteCategory: (id, callBack) => {
        pool.query("DELETE FROM categories WHERE CategoryId=?",
            [
                id
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },
    
};
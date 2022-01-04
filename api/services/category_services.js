const pool = require("../../config/database.js");
const helpers = require("../../helpers/helpers");

module.exports = {

    saveCategory: (data) => {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO categories(CategoryName, CategoryDescription, CategoryImage) values(?,?,?)",
                [
                    data.CategoryName.toUpperCase(),
                    data.CategoryDescription,
                    data.CategoryImage,
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


    checkExisitingCategory: (id = null, data = null) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT CategoryName FROM categories WHERE CategoryName=? OR CategoryId=?",
                [
                    data.CategoryName.toUpperCase(),
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


    getCategories: () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT c.CategoryId, c.CategoryName, COUNT(p.ProductId) as ProductCount FROM categories as c LEFT JOIN products as p on c.CategoryId = p.CategoryId  GROUP BY c.CategoryId, c.CategoryName",
                [
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


    getCategoryProducts: (id) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT p.*, c.CategoryName FROM products as p LEFT JOIN categories as c ON p.CategoryId = c.CategoryId WHERE c.CategoryId=?",
                [
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },



    getCategoriesById: (id) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT c.*, COUNT(p.ProductId) as ProductCount FROM categories as c LEFT JOIN products as p on c.CategoryId = p.CategoryId WHERE c.CategoryId=? GROUP BY c.CategoryId",
                [
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


    updateCategory: (id, data) => {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE categories SET CategoryName=?, CategoryDescription=?, CategoryImage=? WHERE CategoryId=?",
                [
                    data.CategoryName.toUpperCase(),
                    data.CategoryDescription,
                    data.CategoryImage,
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


    deleteCategory: (id) => {
        return new Promise((resolve, reject) => {
            pool.query("DELETE FROM categories WHERE CategoryId=?",
                [
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },

};
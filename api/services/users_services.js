const pool = require("../../config/database.js");
const helpers = require("../../helpers/helpers");


module.exports = {
    saveUser: (data) => {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO users(FirstName, LastName, Email, Password, Gender, Phone, ImgUrl) values(?,?,?,?,?,?,?)",
                [
                    data.FirstName.toUpperCase(),
                    data.LastName.toUpperCase(),
                    data.Email,
                    data.Password,
                    data.Gender.toUpperCase(),
                    data.Phone,
                    data.ImgUrl,
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


    checkExisitingUser: (id = null, data = null) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT Email FROM users WHERE Email=? OR UserId=?",
                [
                    data.Email,
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT UserId, Email, FirstName, LastName, CreatedAt, Gender, Phone, ImgUrl, UpdatedAt FROM users WHERE UserId = ?",
                [
                    id,
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


    getUsers: (data) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT UserId, Email, FirstName FROM users",
                [
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


    updateUser: (id, data) => {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE users SET firstname=?, lastname=?, email=?, gender=?, phone=?, imgurl=? WHERE userid=?",
                [
                    data.FirstName.toUpperCase(),
                    data.LastName.toUpperCase(),
                    data.Email,
                    data.Gender.toUpperCase(),
                    data.Phone,
                    data.ImgUrl,
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },



    changePassword: (id, data) => {
        return new Promise((resolve, reject) => {
            pool.query("UPDATE users SET Password=? WHERE userid=?",
                [
                    data.NewPassword,
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },



    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            pool.query("DELETE FROM users WHERE userid=?",
                [
                    id
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve, reject);
                });
        });
    },


    loginUser: (data) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT Email, UserId, Password FROM users WHERE email=?",
                [
                    data.Email
                ],
                (error, result) => {
                    helpers._getResponse(error, result, resolve[0], reject);
                });
        });
    },
};
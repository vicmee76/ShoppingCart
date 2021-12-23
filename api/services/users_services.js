const pool = require("../../config/database.js");
const helpers = require("../../helpers/helpers");


module.exports = {
    saveUser : (data, callBack) => {
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
            helpers._getCallBack(callBack, error, result);
        });
    },


    checkExisitingUser: (id = null, data = null, callBack) => {
        pool.query("SELECT Email FROM users WHERE Email=? OR UserId=?",
        [
            data.Email,
            id
        ],
        (error, result) => {
            helpers._getCallBack(callBack, error, result);
        });
    },


    getUserById : (id, callBack) => {
        pool.query("SELECT UserId, Email, FirstName, LastName, CreatedAt, Gender, Phone, ImgUrl, UpdatedAt FROM users WHERE UserId = ?",
        [
            id,
        ],
        (error, result) => {
            helpers._getCallBack(callBack, error, result);
        });
    },


    getUsers : (data, callBack) => {
        pool.query("SELECT UserId, Email, FirstName FROM users",
        [
        ],
        (error, result) => {
            helpers._getCallBack(callBack, error, result);
        });
    },


    updateUser : (id, data, callBack) => {
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
            helpers._getCallBack(callBack, error, result);
        });
    },



    changePassword : (id, data, callBack) => {
        pool.query("UPDATE users SET Password=? WHERE userid=?",
        [
            data.NewPassword,
            id
        ],
        (error, result) => {
            helpers._getCallBack(callBack, error, result);
        });
    },



    deleteUser: (id, callBack) => {
        pool.query("DELETE FROM users WHERE userid=?",
            [
                id
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result);
            });
    },


    loginUser: (data, callBack) => {
        pool.query("SELECT Email, UserId, Password FROM users WHERE email=?",
            [
                data.Email
            ],
            (error, result) => {
                helpers._getCallBack(callBack, error, result[0]);
            });
    },
};
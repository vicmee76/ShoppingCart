const pool = require("../../config/database.js");

function getCallBack(callBack, err, result){
    if(err){
        return callBack(error);
    }
    return callBack(null, result);
}

module.exports = {
    saveUser : (data, callBack) => {
        pool.query("INSERT INTO users(FirstName, LastName, Email, Password) values(?,?,?,?)",
        [
            data.FirstName,
            data.LastName,
            data.Email,
            data.Password
        ],
        (error, result) => {
            getCallBack(callBack, error, result);
        }
        );
    },

    checkExisitingUser : (data, callBack) => {
        pool.query("SELECT Email FROM users WHERE Email=?",
        [
            data.Email,
        ],
        (error, result) => {
            getCallBack(callBack, error, result);
        }
        );
    },

    getUserById : (id, callBack) => {
        pool.query("SELECT UserId, Email, FirstName, LastName, CreatedAt FROM users WHERE UserId = ?",
        [
            id,
        ],
        (error, result) => {
            getCallBack(callBack, error, result);
        }
        );
    },

    getUsers : (data, callBack) => {
        pool.query("SELECT UserId, Email, FirstName, LastName, CreatedAt FROM users",
        [
        ],
        (error, result) => {
            getCallBack(callBack, error, result);
        }
        );
    },

    updateUser : (id, data, callBack) => {
        pool.query("UPDATE users SET firstname=?, lastname=?, email=? WHERE userid=?",
        [
            data.FirstName,
            data.LastName,
            data.Email,
            id
        ],
        (error, result) => {
            getCallBack(callBack, error, result);
        }
        );
    },
};
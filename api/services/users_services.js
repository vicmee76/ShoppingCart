const pool = require("../../config/database.js");

function getCallBack(callBack, err, result){
    if(err){
        return callBack(error);
    }
    return callBack(null, result);
}

module.exports = {
    saveUser : (data, callBack) => {
        pool.query("INSERT INTO users(FirstName, LastName, Email, Password, Gender, Phone, ImgUrl) values(?,?,?,?,?,?,?)",
        [
            data.FirstName,
            data.LastName,
            data.Email,
            data.Password,
            data.Gender,
            data.Phone,
            data.ImgUrl,
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
        pool.query("SELECT UserId, Email FROM users",
        [
        ],
        (error, result) => {
            getCallBack(callBack, error, result);
        }
        );
    },

    updateUser : (id, data, callBack) => {
        pool.query("UPDATE users SET firstname=?, lastname=?, email=?, gender=?, phone=?, imgurl=? WHERE userid=?",
        [
            data.FirstName,
            data.LastName,
            data.Email,
            data.Gender,
            data.Phone,
            data.ImgUrl,
            id
        ],
        (error, result) => {
            getCallBack(callBack, error, result);
        }
        );
    },

    deleteUser: (id, callBack) => {
        pool.query("DELETE FROM WHERE userid=?",
            [
                id
            ],
            (error, result) => {
                getCallBack(callBack, error, result);
            }
        );
    },
};
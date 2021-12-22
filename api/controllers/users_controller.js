const bcrypt = require("bcrypt");
const { saveUser, checkExisitingUser, getUserById, getUsers, updateUser, deleteUser } = require("../services/users_services.js");

exports._createUser = (req, res, next) => {
        const data = req.body;

        checkExisitingUser(data, (err, results) => {
            if(err){
             showError(500, res, err);
            }
            else{
               if(results && results.length > 0){
                  showError(500, res, "User already exits");
               }
               else {
                const pass = checkPassword(data.Password);

                if(!pass){
                    showError(500, res, "Password must be more than 7 characters");
                }
                else{
                const hash = bcrypt.hashSync(data.Password, 10);
                data.Password = hash;

                saveUser(data, (errs, response) => {
                    if(errs){
                        showError(500, res, errs);
                    }
                    else{
                        showSuccess(201, res, "User created successfully", response);
                    }
                });
            }
               }
            }
        });
}


exports._getUserById = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    getUserById(id, (err, results) => {
        if(err){
         showError(500, res, err);
        }
        else{
            if(results){
                showSingleUsers(200, res, "User found", results);
            }
            else{
                showError(500, res, "This user was not found");
            }
        }
    });
}

exports._getUsers = (req, res, next) => {
    const data = req.body;
    getUsers(data, (err, results) => {
        if(err){
         showError(500, res, err);
        }
        else{
            if(results){
                showAllUsers(200, res, "Users found", results);
            }
            else{
                showError(500, res, "This user was not found");
            }
        }
    });
}


exports._updateUser = (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    updateUser(id, data, (err, results) => {
        if(err){
         showError(500, res, err);
        }
        else{
            if(results){
                showSuccess(201, res, "Users updated successfully", results);
            }
            else{
                showError(500, res, "This user was not found");
            }
        }
    });
}


exports._deleteUser = (req, res, next) => {
    const id = req.params.id;
    deleteUser(id, (err, results) => {
        if (err) {
            showError(500, res, err);
        }
        else {
            if (results) {
                showSuccess(200, res, "User deleted successfully", results);
            }
            else {
                showError(500, res, "This user was not found");
            }
        }
    });
}




    function showError(code, res, err){
        return res.status(code).json({
            success : false,
            messgae : "Error : " + err
        });
    }


    function showSuccess(code, res, msg, response){
        return res.status(code).json({
            success : false,
            messgae : "Success : " + msg,
            results : response
        });
    }


    function showAllUsers(code, res, msg, response){
        return res.status(code).json({
            success : true,
            messgae : "Success : " + msg,
            results : response.map(x => {
                return {
                    UserId : x.UserId,
                    Email : x.Email,
                    ViewRecord : {
                        type : "GET",
                        link : "http://localhost:4000/api/users/view/"+ x.UserId,
                    },
                    EditRecord : {
                        type : "PUT",
                        link : "http://localhost:4000/api/users/edit/"+ x.UserId,
                    },
                    DeleteRecord : {
                        type : "DELETE",
                        link : "http://localhost:4000/api/users/delete/"+ x.UserId
                    }
                }
            })
        });
    }


    function showSingleUsers(code, res, msg, response){
        return res.status(code).json({
            success : true,
            messgae : "Success : " + msg,
            results : response.map(x => {
                return {
                    UserId : x.UserId,
                    Email : x.Email,
                    FirstName : x.FirstName,
                    LastName: x.LastName,
                    Phone: x.Phone,
                    Gender: x.Gender,
                    Image : x.ImgUrl,
                    CreatedAt : x.CreatedAt,
                    UpdatedAt: x.UpdatedAt,
                    EditRecord : {
                        type : "PUT",
                        link : "http://localhost:4000/api/users/edit/"+ x.UserId,
                    },
                    DeleteRecord : {
                        type : "DELETE",
                        link : "http://localhost:4000/api/users/delete/"+ x.UserId
                    }
                }
            })
        });
    }



    function checkPassword(password){
         return password.length < 8 ? false : true;
    }
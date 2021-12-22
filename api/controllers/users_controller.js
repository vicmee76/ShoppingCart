const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helpers = require("../../helpers/helpers");
const {
    saveUser,
    checkExisitingUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    loginUser,
    changePassword } = require("../services/users_services.js");



exports._createUser = (req, res, next) => {
        const data = req.body;

    checkExisitingUser(null, data, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {
                helpers._showError(409, res, "User already exits");
            }
            else {
                const pass = helpers._checkPassword(data.Password);

                if (!pass) {
                    helpers._showError(406, res, "Password must be more than 7 characters");
                }
                else {
                    const hash = bcrypt.hashSync(data.Password, 10);
                    data.Password = hash;

                    saveUser(data, (errs, response) => {
                        if (errs) {
                            helpers._showError(500, res, errs);
                        }
                        else {
                            helpers._showSuccess(201, res, "User created successfully", response);
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
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {
                helpers._showSingleUsers(200, res, "User found", results);
            }
            else {
                helpers._showError(404, res, "This user was not found");
            }
        }
    });
}


exports._getUsers = (req, res, next) => {
    const data = req.body;
    getUsers(data, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results) {
                helpers._showAllUsers(200, res, "Users found", results);
            }
            else {
                helpers._showError(404, res, "Users not found");
            }
        }
    });
}


exports._updateUser = (req, res, next) => {
    const id = req.params.id;
    const data = req.body;

    checkExisitingUser(id, data, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {

                updateUser(id, data, (err, results) => {
                    if (err) {
                        helpers._showError(500, res, err);
                    }
                    else {
                        if (results) {
                            helpers._showSuccess(201, res, "Users updated successfully", results);
                        }
                        else {
                            helpers._showError(304, res, "Something went wrong");
                        }
                    }
                });
            }
            else {
                helpers._showError(404, res, "User cannot be found");
            }
        }
    });
}


exports._deleteUser = (req, res, next) => {
    const id = req.params.id;
    const data = req.body;

    checkExisitingUser(id, data, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results && results.length > 0) {
                deleteUser(id, (err, results) => {
                    if (err) {
                        helpers._showError(500, res, err);
                    }
                    else {
                        if (results) {
                            helpers._showSuccess(200, res, "User deleted successfully", results);
                        }
                        else {
                            helpers._showError(501, res, "Something went wrong " + err);
                        }
                    }
                });
            }
            else {
                helpers._showError(404, res, "User cannot be found");
            }
        }
    });
}


exports._loginUser = (req, res, next) => {
    const data = req.body;
    loginUser(data, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results) {
                const pass = bcrypt.compareSync(data.Password, results.Password);
                if (pass) {
                    const token = jwt.sign(
                        {
                            userid: results.UserId,
                            email: results.Email
                        }, process.env.JWT_KEY, { expiresIn: "1h" });

                    helpers._showSuccess(200, res, "Login successfully", null, token);
                }
                else {
                    helpers._showError(406, res, "Wrong password");
                }
            }
            else {
                helpers._showError(404, res, "Email not found");
            }
        }
    });
}


exports._changePassword = (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    loginUser(data, (err, results) => {
        if (err) {
            helpers._showError(500, res, err);
        }
        else {
            if (results) {

                const pass = bcrypt.compareSync(data.OldPassword, results.Password);

                if (pass) {

                    const checkPass = helpers._checkPassword(data.NewPassword);

                    if (checkPass) {

                        const hash = bcrypt.hashSync(data.NewPassword, 10);
                        data.NewPassword = hash;

                        changePassword(id, data, (errs, response) => {
                            if (errs) {
                                helpers._showError(500, res, errs);
                            }
                            else {
                                helpers._showSuccess(201, res, "Password updated successfully", response, null);
                            }
                        });
                    }
                    else {
                        helpers._showError(400, res, "New password must be more than 7 characters");
                    }
                }
                else {
                    helpers._showError(406, res, "Wrong old password");
                }
            }
            else {
                helpers._showError(404, res, "User not found");
            }
        }
    });
}
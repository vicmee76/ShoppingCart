const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helpers = require("../../helpers/helpers");
const { validationResult } = require('express-validator');

const {
    saveUser,
    checkExisitingUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    loginUser,
    changePassword } = require("../services/users_services.js");


// create a user
exports._createUser = async (req, res) => {

    try {
        const data = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const check = await checkExisitingUser(null, data);

        if (check && check.length > 0) {
            helpers._showError(409, res, "User already exits");
        }
        else {
            // checking only password length
            const pass = helpers._checkPassword(data.Password);
            if (!pass) {
                helpers._showError(406, res, "Password must be more than 7 characters");
            }
            else {
                // encrypt password
                const hash = bcrypt.hashSync(data.Password, 10);
                data.Password = hash;

                const save = await saveUser(data);
                if (save) {
                    helpers._showSuccess(201, res, "User created successfully", save);
                }
                else {
                    helpers._showError(500, res, "Error");
                }
            }
        }
    } catch (e) {
        helpers._showError(500, res, e);
    }

}


// get single user by id
exports._getUserById = async (req, res) => {

    try {
        const userid = req.params.id;
        const user = await getUserById(userid);
        if (user && user.length > 0) {
            helpers._showSingleUsers(200, res, "User found", user);
        }
        else {
            helpers._showError(404, res, "This user was not found");
        }
    } catch (e) {
        helpers._showError(500, res, e);
    }
}



// get all users 
exports._getUsers = async (req, res) => {

    try {
        const data = req.body;
        const users = await getUsers(data);
        if (users && users.length > 0) {
            helpers._showAllUsers(200, res, "User found", users);
        }
        else {
            helpers._showError(404, res, "This user was not found");
        }
    } catch (e) {
        helpers._showError(500, res, e);
    }
}


// update user info
exports._updateUser = async (req, res) => {

    try {
        const userid = req.params.id;
        const data = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const check = await checkExisitingUser(userid, data);

        if (check && check.length > 0) {
            const update = await updateUser(userid, data);
            if (update) {
                helpers._showSuccess(201, res, "Users updated successfully", update);
            }
            else {
                helpers._showError(304, res, "Something went wrong");
            }
        }
        else {
            helpers._showError(404, res, "User cannot be found");
        }
    } catch (e) {
        helpers._showError(500, res, e);
    }
}



// delete a user
exports._deleteUser = async (req, res) => {

    try {
        const userid = req.params.id;
        const data = req.body;
        const check = await checkExisitingUser(userid, data);

        if (check && check.length > 0) {
            const del = deleteUser(userid);
            if (del) {
                helpers._showSuccess(200, res, "User deleted successfully", del);
            }
            else {
                helpers._showError(501, res, "Something went wrong");
            }
        }
        else {
            helpers._showError(404, res, "User cannot be found");
        }
    } catch (e) {
        helpers._showError(500, res, e);
    }
}



// user login
exports._loginUser = async (req, res) => {

    try {
        const data = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const login = await loginUser(data);
        if (login) {
            const pass = bcrypt.compareSync(data.Password, login[0].Password);

            if (pass) {
                // set token for login user
                const token = jwt.sign(
                    {
                        userid: login[0].UserId,
                        email: login[0].Email
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
    } catch (e) {
        helpers._showError(500, res, err);
    }
}



// change password for a user
exports._changePassword = async (req, res) => {
    try {
        const userid = req.params.id;
        const data = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const login = await loginUser(data)

        if (login) {
            const pass = bcrypt.compareSync(data.OldPassword, login[0].Password);
            if (pass) {
                // checking password length
                const checkPass = helpers._checkPassword(data.NewPassword);

                if (checkPass) {
                    // new encrypted password
                    const hash = bcrypt.hashSync(data.NewPassword, 10);
                    data.NewPassword = hash;

                    var change = await changePassword(userid, data);

                    if (change) {
                        helpers._showSuccess(201, res, "Password updated successfully", null, null);
                    }
                    else {
                        helpers._showError(500, res, "Something went wrong");
                    }
                }
                else {
                    helpers._showError(406, res, "New password must be more than 7 characters");
                }
            }
            else {
                helpers._showError(406, res, "Wrong old password");
            }
        }
        else {
            helpers._showError(404, res, "User not found");
        }
    } catch (e) {
        helpers._showError(500, res, err);
    }
}
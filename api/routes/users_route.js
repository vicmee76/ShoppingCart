const express = require("express");
const { body } = require('express-validator');
const userController = require("../controllers/users_controller.js");
const router = express.Router();
const validate = require("../../auth/validateToken.js");



// create a user
router.post('/',
    // input validation
    body("FirstName", "FirstName should not be empty and should be more than 3").notEmpty().isLength({ min: 3 }),
    body("LastName", "Lastname should not be empty and should be more than 3").notEmpty().isLength({ min: 3 }),
    body("Email", "Email is invalid").notEmpty().isEmail(),
    body("Phone", "Phone should not be empty and should be more than 7").notEmpty().isLength({ min: 7 }),
    body("Gender", "Gender shpould not be empty").notEmpty(),
    body("Password", "Password should not be empty").notEmpty(),
    userController._createUser);


// get all users
router.get('/all', validate._validateToken, userController._getUsers);


// view a user deatail
router.get('/view/:id', validate._validateToken, userController._getUserById); 


// update a user information without password
router.put('/edit/:id',
    // input validation
    body("FirstName", "FirstName should not be empty and should be more than 3").notEmpty().isLength({ min: 3 }),
    body("LastName", "Lastname should not be empty and should be more than 3").notEmpty().isLength({ min: 3 }),
    body("Email", "Email is invalid").notEmpty().isEmail(),
    body("Phone", "Phone should not be empty and should be more than 7").notEmpty().isLength({ min: 7 }),
    body("Gender", "Gender shpould not be empty").notEmpty(),
    validate._validateToken, userController._updateUser);


// delete a user
router.delete('/delete/:id', validate._validateToken, userController._deleteUser);



// user login with authentication
router.post('/login',
    // input validation
    body("Email", "Email is invalid").notEmpty().isEmail(),
    body("Password", "Password should not be empty").notEmpty(),
    userController._loginUser);



// change user password
router.post('/changepassword/:id',
  // input validation
    body("Email", "Email is invalid").notEmpty().isEmail(),
    body("OldPassword", "Old Password should not be empty").notEmpty(),
    body("NewPassword", "New Password should not be empty").notEmpty(),
    validate._validateToken, userController._changePassword);



module.exports = router;
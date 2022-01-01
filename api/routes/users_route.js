const express = require("express");
const { body, validationResult } = require('express-validator');
const userController = require("../controllers/users_controller.js");
const router = express.Router();
const validate = require("../../auth/validateToken.js");

router.post('/',
    // validation
    body("FirstName", "FirstName should not be empty and should be more than 3").notEmpty().isLength({ min: 3 }),
    body("LastName", "Lastname should not be empty and should be more than 3").notEmpty().isLength({ min: 3 }),
    body("Email", "Email is invalid").notEmpty().isEmail(),
    body("Phone", "Phone should not be empty and should be more than 7").notEmpty().isLength({ min: 7 }),
    body("Gender", "Gender shpould not be empty").notEmpty(),
    body("Password", "Password should not be empty").notEmpty(),
    userController._createUser);


router.get('/all', validate._validateToken, userController._getUsers);


router.get('/view/:id', validate._validateToken, userController._getUserById); 


router.put('/edit/:id',
    // validation
    body("FirstName", "FirstName should not be empty and should be more than 3").notEmpty().isLength({ min: 3 }),
    body("LastName", "Lastname should not be empty and should be more than 3").notEmpty().isLength({ min: 3 }),
    body("Email", "Email is invalid").notEmpty().isEmail(),
    body("Phone", "Phone should not be empty and should be more than 7").notEmpty().isLength({ min: 7 }),
    body("Gender", "Gender shpould not be empty").notEmpty(),
    validate._validateToken, userController._updateUser);


router.delete('/delete/:id', validate._validateToken, userController._deleteUser);


router.post('/login',
    // validation
    body("Email", "Email is invalid").notEmpty().isEmail(),
    body("Password", "Password should not be empty").notEmpty(),
    userController._loginUser);


router.post('/changepassword/:id',
    // validation
    body("Email", "Email is invalid").notEmpty().isEmail(),
    body("OldPassword", "Old Password should not be empty").notEmpty(),
    body("NewPassword", "New Password should not be empty").notEmpty(),
    validate._validateToken, userController._changePassword);



module.exports = router;
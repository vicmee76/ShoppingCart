const express = require("express");
const userController = require("../controllers/users_controller.js");
const router = express.Router();
const validate = require("../../auth/validateToken.js");

router.post('/', validate._validateToken, userController._createUser);
router.get('/all', validate._validateToken, userController._getUsers);
router.get('/view/:id', validate._validateToken, userController._getUserById);
router.put('/edit/:id', validate._validateToken, userController._updateUser);
router.delete('/delete/:id', validate._validateToken, userController._deleteUser);
router.post('/login', userController._loginUser);



module.exports = router;
const express = require("express");
const userController = require("../controllers/users_controller.js");
const router = express.Router();

router.post('/', userController._createUser);
router.get('/all', userController._getUsers);
router.get('/view/:id', userController._getUserById);
router.put('/edit/:id', userController._updateUser);
router.delete('/delete/:id', userController._updateUser);



module.exports = router;
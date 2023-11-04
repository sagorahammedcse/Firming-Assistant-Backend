const express = require('express');
const {
    registerUser,
    login,
    logout,
    getSingleUser
} = require('../controllers/userController');
const {
    isAuthenticatedUser
} = require("../middleware/auth");

const router = express.Router();


// crate user or register 
router.route("/register").post(registerUser);
// login router 
router.route("/login").post(login);
//logout router
router.route("/logout").get(logout);
// get logged user details 
router.route("/me").get(isAuthenticatedUser, getSingleUser);

module.exports = router;
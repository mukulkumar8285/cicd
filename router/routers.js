const express = require("express");
const UserController = require("../controller/UserData");

const router = express.Router();

router.post("/login" , UserController.login);
router.post("/signup" , UserController.signup);
router.post("/logout" , UserController.logout);


module.exports = router;

const express = require("express");

const router = express.Router();

const userController = require("../controllers/users");

router.post("/signUp", userController.signUp);

router.post("/signIn", userController.signIn);

module.exports = router;

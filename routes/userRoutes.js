const express = require("express");
const {
	createUser,
	loginUser,
	getUser,
} = require("../controllers/userController");
const { userResult, getResult } = require("../controllers/resultController");
const { auth } = require("../middilewares/auth");

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/:id").get(auth, getUser);
router.route("/result").post(auth, userResult);
router.route("/result/:id").get(auth, getResult);

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsyc = require("../utils/wrapAsyc.js");
const passport = require("passport");
const { saveredirecturl } = require("../middleware.js");

const userController = require("../controllers/users.js")


router.route("/signup")
    .get(userController.renderSignup)
    .post(wrapAsyc(userController.signup));


router.route("/login")
    .get(userController.renderLogin)
    .post(
        saveredirecturl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login)

router.get("/logout", userController.logout);
module.exports = router;

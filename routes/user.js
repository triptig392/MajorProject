const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.renderSignupFrom)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

//logout user
router.get("/logout", userController.logout);

module.exports = router;

///paasport provide a middlware function .......pehle strategy provide krte h .....fir failure redirect ...agar user verify nhi hua toh woh uspar redirect ho jata h ....failure flash agar user naa ho ya username glt ho ya password glt ho

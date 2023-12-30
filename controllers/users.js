const User = require("../models/user.js");

module.exports.renderSignupFrom = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    ///done by meeehhhh
    if (req.body.password.length < 5) {
      req.flash("error", "password should be more than 5 characters");
      res.redirect("/signup");
      return;
    }
    //////meehhhhh
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    //login after signup
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderers");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome to Wanderers! You are logged in");
  //we are saving redirect url in another variable so that we can redirect to our home page when we login from home page as initially agar hum login kr rhe the tb yh res.locals.redirecturl empty tha agar home page s login kr rhe thw toh
  let redirectU = res.locals.redirectUrl || "/listings";
  res.redirect(redirectU);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};

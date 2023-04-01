const express = require("express");
const passport = require("passport");
require("../config/auth");

const router = express.Router();

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json({ status: "Login failed" });
  }
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error(err);
    } else {
      res.json({ status: "Logged out" });
    }
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_ORIGIN_FAILURE,
    successRedirect: process.env.CLIENT_ORIGIN,
  })
);

module.exports = router;

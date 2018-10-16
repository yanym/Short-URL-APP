"use strict";

const express       = require('express');
const userRoutes    = express.Router();
const bcrypt        = require('bcrypt');
const randomizer    = require("../lib/randomizer");

module.exports = function(users, urlDatabase) {

  userRoutes.post("/register", (req, res) => {
    let { email, password } = req.body;
    // Conditional checks for email
    if (email.length <= 5) {
      req.flash('danger', "Check your email address");
      res.redirect("/register")
    };
    // Check if email is reged
    for (key in users) {
      if (users[key].email === email) {
        req.flash('warning', "Email has been used!");
        res.redirect("/register")
      };
    };
    // Conditional checks for password
    if (!password) {
      req.flash('danger', "Please provide a password.");
      res.redirect("/register")
    };
    // Creating new user
    let user_id = randomizer();
    req.session.user_id = user_id;
    users[user_id] = {id: user_id, email: email, password: bcrypt.hashSync(password, 10) };
    urlDatabase[user_id] = {};
    req.flash('success', "Sign up success!");
    res.redirect("/urls");
  });

  // Login form data
  userRoutes.post("/login", (req, res) => {
    let userFound = false;
    let { email, password } = req.body;
    for (key in users) {
      if (users[key].email === email) {
        if (bcrypt.compareSync(password, users[key].password)) {
          userFound = true;
          req.session.user_id = users[key].id;
          res.redirect("/urls");
        }
      }
    }
    if (!userFound) {
      req.flash('danger', "Please check your username and/or password.");
      return res.redirect("/login");
    }
  });

  userRoutes.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return userRoutes;

};

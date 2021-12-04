const express = require("express");
const db = require("../../db/connectToDB");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user_router = express.Router();

user_router.post("/log_in", (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    console.log(email, password);
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database

    db.query(
      `SELECT * FROM user WHERE email = '${email}'`,
      async (err, result) => {
        if (err) throw err;
        else {
          const user = result[0];

          if (user && bcrypt.compareSync(password, user.user_password)) {
            console.log("i am here");
            // Create token
            const token = jwt.sign(
              { user_id: user._id, email },
              process.env.JWT_KEY,
              {
                expiresIn: "2h",
              }
            );
            // save user token
            user.token = token;
            console.log("user : ", user);

            // user

            res.status(200).cookie("jwt", token).send(user);
          } else {
            res.status(401).send("Invalid Username or Password");
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

user_router.post("/sign_in", (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    console.log(req.body);

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    //Encrypt user password
    const encryptedPassword = bcrypt.hashSync(password, 10);

    db.query(
      "INSERT INTO user(first_name,last_name,email,user_password) VALUES(?,?,?,?)",
      [first_name, last_name, email, encryptedPassword],
      (err, result) => {
        if (err) {
          res.status(400).send(err);
        }
      }
    );

    // Create token
    const token = jwt.sign({ user_id: user._id, email }, process.env.JWT_KEY, {
      expiresIn: "2h",
    });
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
    res.cookie("jwt", token);
    // res.cookie("is_admin", token);
  } catch (err) {
    console.log(err);
  }
});

module.exports = { user_router };

const express = require("express");
const db = require("../../db/connectToDB");
require("dotenv").config();

const car_routes = express.Router();

car_routes.get("/the_cars", (req, res, next) => {
  try {
    db.query(
      `SELECT * FROM the_cars `,

      (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
      }
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = { car_routes };

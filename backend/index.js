const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const db = require("./db/connectToDB");
const { user_router } = require("./routes/user_routes/user_routes");
const { ticket_router } = require("./routes/ticket_routes/ticket_routes");
const { product_router } = require("./routes/product_routes/product_routes");
const { car_routes } = require("./routes/car_routes/car_routes");
const { generateUploadURL } = require("./s3/s3");

const app = express(user_router);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(user_router);
app.use(ticket_router);
app.use(product_router);
app.use(car_routes);
dotenv.config();

const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

db.connect((err) => {
  if (err) throw err;

  console.log("mysql database connected !");
});

const calculateOrderAmount = async (product_id) => {
  let amount = new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM 007_website.product WHERE product_id = '${product_id}'`,

      (err, result) => {
        if (err) reject(err);
        resolve(result[0].price * 100);
      }
    );
  });

  return amount;
};

app.post("/create-product-payment-intent", async (req, res) => {
  const { product_id } = req.body;
  console.log("#", req.body);
  // Create a PaymentIntent with the order amount and currency
  let amount = await calculateOrderAmount(product_id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/s3_url", async (req, res) => {
  const url = await generateUploadURL();
  console.log("URL : ", url);
  res.send({ url });
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.listen(process.env.PORT || 8000, () => {
  console.log(`server is listening on port ${process.env.PORT || 8000} ~`);
});

const express = require("express");
const db = require("../../db/connectToDB");
require("dotenv").config();
const { emailSender } = require("../../queries/nodemailer/Nodemailer");
const {
  SelectAllProductsImages,
  SelectAllProducts,
  SelectProductDashboardData,
} = require("../../queries/productQueries");

const product_router = express.Router();
const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

product_router.get("/products", async (req, res) => {
  try {
    const products = await SelectAllProducts();
    const images = await SelectAllProductsImages();

    res.status(200).send({ products, images });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

product_router.post("/product_sold", async (req, res) => {
  const {
    product_id,
    product_name,
    firstName,
    lastName,
    country,
    address,
    phoneNumber,
    email,
  } = req.body;
  console.log(req.body);
  const date = new Date().toISOString().split("T")[0];
  console.log("date : ", date);
  console.log("product_id :", product_id);
  try {
    db.query(
      `INSERT INTO
              product_sold(product_id ,first_name,last_name,country,address,phone_number,email,purchase_date)
                VALUES(?,?,?,?,?,?,?,?)
                  ;
                  `,
      [
        product_id,
        firstName,
        lastName,
        country,
        address,
        phoneNumber,
        email,
        date,
      ],

      (err, result) => {
        if (err) throw err;
        // res.send("product sold data inserted !");
      }
    );

    db.query(
      `UPDATE product SET in_stock = in_stock - 1 WHERE product_id = '${product_id}';`,
      (err, result) => {
        if (err) throw err;
      }
    );

    //send email to client here
    let text = `${firstName} ${lastName} ,you have perchased ${product_name} on ${date} , your order is on its way to your address
      ${address} !`;

    emailSender(email, "007 website Purchase confimation", text);
  } catch (err) {
    console.log(err);
  }
  res.send("purchase confirmed in db");
});

product_router.post("/new_product", async (req, res) => {
  const { name, price, instock, category, description, images } = req.body;

  console.log(req.body);
  const id = crypto.randomBytes(16).toString("hex");

  await db.query(
    "INSERT INTO product(product_id,product_name,price,product_description,in_stock,category) VALUES(?,?,?,?,?,?)",
    [id, name, price, description, instock, category],
    (err, result) => {
      if (err) throw err;
    }
  );
  await images.forEach((image) => {
    db.query(
      "INSERT INTO product_images(product_id,picture_url,image_name) VALUES(?,?,?)",
      [id, image.url, image.name]
    );
  });

  res.status(200).send("product added succsessfully ~!!");
});

product_router.post("/update_products", (req, res) => {
  console.log("updated produts res : ", req.body);
  req.body.forEach((product) => {
    db.query(
      `UPDATE product SET
         product_name = '${product.product_name}',
         price = ${product.price},
         product_description = '${product.product_description}',
         in_stock = ${product.in_stock},
         category = '${product.category}'
        WHERE product_id = '${product.product_id}'
          `,
      (err, result) => {
        if (err) throw err;
      }
    );
  });
  res.status(200).send("ok");
});

product_router.delete("/delete_products", (req, res) => {
  console.log("req : ", req.body);
  req.body.forEach((product_id) => {
    db.query(
      `DELETE FROM product_images WHERE product_id = '${product_id}';
        DELETE FROM product WHERE product_id = '${product_id}'
          `,
      (err, result) => {
        if (err) throw err;
      }
    );
  });
  res.status(200).send("ok");
});

product_router.get("/dashboard/products", async (req, res) => {
  //DATE BETWEEN EXAMPLE
  //   SELECT * FROM Product_sales
  // WHERE From_date between '2013-01-03'
  // AND '2013-01-09'

  //1.all products sold
  //2.all tickets sold
  //3.ticket prices
  //4.

  let { startDate, endDate } = req.query;

  try {
    const result = await SelectProductDashboardData(
      (startDate = new Date(startDate).toISOString().split("T")[0]),
      (endDate = new Date(endDate).toISOString().split("T")[0])
    );
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = { product_router };

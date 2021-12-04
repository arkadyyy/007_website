const express = require("express");
const db = require("../../db/connectToDB");
const { SelectAllTickets } = require("../../queries/ticketQueries");
const { emailSender } = require("../../queries/nodemailer/Nodemailer");
const { SelectTicketDashboardData } = require("../../queries/ticketQueries");
require("dotenv").config();
const ticket_router = express.Router();
const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);
const calculateTicketOrderAmount = async (visitorAmount, ticketType) => {
  let amount = new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM 007_website.ticket WHERE id = ${ticketType}`,

      (err, result) => {
        if (err) reject(err);
        console.log("result : ", result);
        resolve(result[0].ticket_price * 100);
      }
    );
  });

  return amount;
};

ticket_router.get("/tickets", async (req, res) => {
  try {
    const tickets = await SelectAllTickets();

    res.status(200).send(tickets);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

ticket_router.post("/create_ticket", (req, res) => {
  const { ticketType, ticketPrice, description } = req.body;
  try {
    console.log(ticketType, ticketPrice, description);
    db.query(
      `INSERT INTO
              ticket(ticket_type,ticket_price,description)
                VALUES(?,?,?)
                  ;
                  `,
      [ticketType, ticketPrice, description],

      (err, result) => {
        if (err) throw err;
        // res.send("product sold data inserted !");
      }
    );
    res.status(200).send("ticket created !");
  } catch (err) {
    console.log(err);
    res.status(400).send("ticket creation went wrong...");
  }
});

ticket_router.delete("/delete_ticket", (req, res) => {
  console.log(req.body);

  try {
    req.body.forEach((ticket_type) => {
      db.query(
        `DELETE FROM ticket WHERE ticket_type = '${ticket_type}';
            `,
        (err, result) => {
          if (err) throw err;
        }
      );
    });
    res.status(200).send("ticket deleted succssesfully");
  } catch (err) {
    res.status(400).send(err);
  }
});

ticket_router.post("/update_tickets", (req, res) => {
  console.log("## ", req.body);

  try {
    req.body.forEach((ticket) => {
      db.query(
        `UPDATE ticket SET
           ticket_type = '${ticket.ticket_type}',
           ticket_price = ${ticket.ticket_price},
           description = '${ticket.description}'
          
               WHERE id = '${ticket.id}'
            `,
        (err, result) => {
          if (err) throw err;
        }
      );
    });

    res.status(200).send("tickets updated !");
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

ticket_router.post("/ticket_sold", async (req, res) => {
  const {
    visitorAmount,
    firstName,
    lastName,
    email,
    selectedDate,
    hour,
    phoneNumber,
    ticketType,
  } = req.body;
  console.log(req.body);
  const _date = selectedDate.split("T")[0];
  console.log("date : ", _date);

  try {
    db.query(
      `INSERT INTO
              ticket_reservation(visitor_amount,first_name,last_name,email,ticket_date,ticket_hour,phone_number,ticket_type_id)
                VALUES(?,?,?,?,?,?,?,?)
                  ;
                  `,
      [
        visitorAmount,
        firstName,
        lastName,
        email,
        _date,
        hour,
        phoneNumber,
        ticketType,
      ],

      (err, result) => {
        if (err) throw err;
        // res.send("product sold data inserted !");
      }
    );

    // db.query(
    //   `UPDATE product SET in_stock = in_stock - 1 WHERE product_id = '${product_id}';`,
    //   (err, result) => {
    //     if (err) throw err;
    //   }
    // );

    // //send email to client here
    // let text = `${firstName} ${lastName} ,you have perchased ${product_name} on ${date} , your order is on its way to your address
    // ${address} !`;

    // emailSender(email, "007 website Purchase confimation", text);
  } catch (err) {
    console.log(err);
  }
  res.send("purchase confirmed in db");
});

ticket_router.post("/create-ticket-payment-intent", async (req, res) => {
  const { visitorAmount, ticketType } = req.body;
  console.log("ticket request body  : ", req.body);

  // 0 = regular
  // 1 = regular+
  // 2 = premium
  console.log("i am ticket payment intent $_$");
  console.log("ticket : ", ticketType);

  let amount = await calculateTicketOrderAmount(visitorAmount, ticketType);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

ticket_router.get("/dashboard/tickets", async (req, res) => {
  let { startDate, endDate } = req.query;

  try {
    const result = await SelectTicketDashboardData(
      (startDate = new Date(startDate).toISOString().split("T")[0]),
      (endDate = new Date(endDate).toISOString().split("T")[0])
    );
    console.log("RESULT DASHBOARD TICKET : ", result);
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = { ticket_router };

const db = require("../db/connectToDB");

const SelectAllTickets = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM ticket ", (error, elements) => {
      if (error) {
        return reject(error);
      }
      return resolve(elements);
    });
  });
};

const SelectTicketDashboardData = (startDate, endDate) => {

  return new Promise((resolve, reject) => {
    db.query(
      `
      SELECT
       ticket_reservation.id ,
       ticket_reservation.visitor_amount ,
       ticket_reservation.ticket_type_id,
       ticket_reservation.ticket_date ,
       ticket.id,
       ticket.ticket_type,
       ticket.ticket_price
      FROM
        ticket_reservation
        INNER JOIN
        ticket 
      ON
         ticket_reservation.ticket_type_id = ticket.id
         WHERE
         ticket_date between '${startDate}' and '${endDate}'
        `,

      (err, result) => {
        if (err) {
          return reject(err);
        }
        console.log("Ticket RESULT : ", result);
        return resolve(result);
      }
    );
  });
};

module.exports = {
  SelectAllTickets,
  SelectTicketDashboardData,
};

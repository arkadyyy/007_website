import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getAllTickets } from "../../../store/actions/actions";
import TicketTable from "./TicketTable/TicketTable";
import { Box, Button } from "@material-ui/core";
import AddTicket from "./AddTicket/AddTicket";
import { Add } from "@material-ui/icons";
const TicketManagment = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);

  const [addTicketDisplayed, setaddTicketDisplayed] = useState(false);

  const getTickets = () => {
    axios.get("http://localhost:8888/tickets").then((res) => {
      dispatch(getAllTickets(res.data));
    });
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <>
      {addTicketDisplayed ? (
        <AddTicket
          setaddTicketDisplayed={setaddTicketDisplayed}
          getTickets={getTickets}
        />
      ) : (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            margin: "0 auto",
          }}
        >
          <Box>
            <h2>Ticket managment</h2>
            <Button
              style={{
                backgroundColor: "#222322",
                color: "white",
                textTransform: "none",
                marginBottom: "1rem",
              }}
              onClick={() => setaddTicketDisplayed(true)}
            >
              <Add /> add ticket
            </Button>
          </Box>
          <TicketTable getTickets={getTickets} />
        </Box>
      )}
    </>
  );
};

export default TicketManagment;

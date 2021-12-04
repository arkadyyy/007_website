import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddTicket.css";
import {
  Button,
  Container,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { DropzoneArea } from "material-ui-dropzone";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
  })
);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const AddTicket = ({ setaddTicketDisplayed, getTickets }) => {
  const classes = useStyles();

  const [ticketType, setticketType] = useState("");
  const [ticketPrice, setticketPrice] = useState("");
  const [description, setdescription] = useState(null);

  const [displayMsg, setdisplayMsg] = useState(false);

  const [msg, setmsg] = useState("");

  useEffect(() => {
    console.log(displayMsg);
    setTimeout(() => {
      setdisplayMsg(false);
    }, 4700);
  }, [displayMsg]);

  const onAddProduct = async (ticketType, ticketPrice, description) => {
    axios
      .post("http://localhost:8888/create_ticket", {
        ticketType,
        ticketPrice,
        description,
      })

      .then((res) => {
        console.log(res);
        setticketType("");
        setticketPrice("");
        setdescription("");
        setmsg(res.data);
        setdisplayMsg(true);
        getTickets();
      })
      .catch((err) => {
        console.log(err);
        setmsg(err.message);
        setdisplayMsg(true);
      });
  };

  return (
    <>
      <Container>
        <Button
          style={{
            textTransform: "none",
            position: "relative",
            margin: " 1rem 8rem",
          }}
          onClick={() => setaddTicketDisplayed(false)}
        >
          <ArrowBackIosIcon /> Back
        </Button>
        <Container>
          <Typography>Add Ticket</Typography>
          <Box
            component='form'
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete='off'
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "2rem",
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",

                flex: 2,
              }}
            >
              <TextField
                style={{ width: "70%" }}
                className='textfield'
                value={ticketType}
                label={"Ticket Type"}
                onChange={(e) => setticketType(e.target.value)}
              />
              <TextField
                style={{ width: "70%" }}
                className='textfield'
                label={"Ticket Price"}
                value={ticketPrice}
                onChange={(e) => setticketPrice(e.target.value)}
              />

              <TextField
                multiline
                rows={2}
                rowsMax={4}
                label={"Description"}
                value={description}
                variant='outlined'
                style={{ width: "70%", marginTop: "1.4rem" }}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Box>
          </Box>
        </Container>
        <Button
          // disabled={allowdToUpload}
          style={{
            textTransform: "none",
            position: "relative",
            margin: " 1rem 8rem",
            border: "2px solid #232020",
          }}
          onClick={() => onAddProduct(ticketType, ticketPrice, description)}
        >
          {"Add Ticket"}
        </Button>

        <Snackbar
          open={displayMsg}
          autoHideDuration={6000}
          // onClose={handleClose}
        >
          <Alert
            // onClose={handleClose}
            severity='error'
            sx={{ width: "100%", backgroundColor: "#222322" }}
          >
            {msg}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default AddTicket;

import React from "react";

import "../TicketPage.css";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/NavBar";
import ticket_bond from "../../../iamges/ticket_bond.png";
import SucceededPage from "../SucceededPage/SucceededPage";

import {
  Button,
  Container,
  Box,
  Input,
  TextField,
  FormControl,
  FormHelperText,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DateTimePicker";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const LargeScreen = ({
  setFirstName,
  setLastName,
  setEmail,
  setPhoneNumber,
  handleDateChange,
  onHourChange,
  setVisitorsAmount,
  succeededUI,
  visitorAmount,
  firstName,
  lastName,
  email,
  selectedDate,
  hour,
  phoneNumber,
  ticketType,
  onTabValueChange,
  a11yProps,
  handleSubmit,
  disabled,
  handleChange,
  processing,
  succeeded,
}) => {
  return (
    <>
      <Navbar notFoundPage={false} color='black' />
      <div className='ticket_triangle'></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "11rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#f4f4f4",
            paddingTop: "2rem",
            width: "800px",
            height: "80vh",
            marginRight: "2rem",
            marginTop: "17rem",
          }}
        >
          {/* <h4
            style={{
              fontFamily: "roboto",
              fontWeight: "light",
              padding: "0.3rem",
            }}
          >
            Select Ticket Type
          </h4> */}
          {succeededUI ? (
            <SucceededPage
              visitorAmount={visitorAmount}
              firstName={firstName}
              lastName={lastName}
              email={email}
              date={selectedDate}
              hour={hour}
              phoneNumber={phoneNumber}
              ticketType={ticketType}
            />
          ) : (
            <div style={{ backgroundColor: "#C4C4C4" }}>
              <Tabs
                TabIndicatorProps={{ color: "black" }}
                style={{
                  backgroundColor: "#f4f4f4",
                  width: "100%",
                  height: "5rem",
                }}
                value={ticketType}
                onChange={onTabValueChange}
                textColor='secondary'
                indicatorColor='secondary'
                aria-label='secondary tabs example'
              >
                <Tab
                  style={{
                    boxShadow: ticketType === 0 ? "5px 10px 8px #888888" : null,
                    textTransform: "none",
                    backgroundColor:
                      ticketType === 0 ? "#C4C4C4" : "transparent",
                    paddingBottom: "5rem",
                    fontSize: "25px",
                  }}
                  label='Regular'
                  {...a11yProps(0)}
                />
                <Tab
                  style={{
                    boxShadow: ticketType === 1 ? "5px 10px 8px #888888" : null,
                    textTransform: "none",
                    backgroundColor:
                      ticketType === 1 ? "#C4C4C4" : "transparent",
                    paddingBottom: "5rem",
                    fontSize: "25px",
                  }}
                  label='Regular+'
                  {...a11yProps(1)}
                />
                <Tab
                  style={{
                    boxShadow: ticketType === 2 ? "5px 10px 8px #888888" : null,
                    textTransform: "none",
                    backgroundColor:
                      ticketType === 2 ? "#C4C4C4" : "transparent",
                    paddingBottom: "5rem",
                    fontSize: "25px",
                  }}
                  label='Premium'
                  {...a11yProps(2)}
                />
              </Tabs>

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  width: "60%",
                  // height: "50vh",
                  marginTop: "3rem",
                  padding: "3rem",
                }}
              >
                <TextField
                  onChange={(e) => setFirstName(e.target.value)}
                  label='First Name'
                />
                <TextField
                  onChange={(e) => setLastName(e.target.value)}
                  label='Last Name'
                />
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  label='email'
                />
                <TextField
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  label='phone number'
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    renderInput={(params) => <TextField {...params} />}
                    label='Date'
                    value={selectedDate}
                    onChange={(newValue) => {
                      handleDateChange(newValue);
                    }}
                    minDate={new Date("2020-02-14")}
                  />
                </LocalizationProvider>

                <FormControl variant='outlined' sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    labelId='demo-simple-select-standard-label'
                    id='demo-simple-select-standard'
                    value={hour}
                    onChange={onHourChange}
                    label='Hour'
                  >
                    {[
                      "9:00 - 10:00",
                      "10:00 - 11:00",
                      "11:00 - 12:00",
                      "12:00 - 13:00",
                      "13:00 - 14:00",
                      "14:00 - 15:00",
                      "15:00 - 16:00",
                      "16:00 - 17:00",
                      "17:00 - 18:00",
                    ].map((time) => (
                      <MenuItem value={time}>{time}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  onChange={(e) => setVisitorsAmount(e.target.value)}
                  label='number of visitors'
                />
                <div
                  style={{
                    marginTop: "3rem",
                    width: "80%",
                    borderBottom: "2px solid grey ",
                  }}
                >
                  <CardElement
                    id='card-element'
                    options={cardStyle}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  type='submit'
                  style={{
                    textTransform: "None",
                    marginTop: "3rem",
                    border:
                      processing || disabled || succeeded
                        ? "1px solid #A29191"
                        : "1px solid #232020",
                  }}
                  disabled={processing || disabled || succeeded}
                  id='submit'
                >
                  <span id='button-text'>
                    {processing ? (
                      <div className='spinner' id='spinner'></div>
                    ) : (
                      "Pay now"
                    )}
                  </span>
                </Button>
              </form>
            </div>
          )}
        </div>

        <div style={{ maxWidth: "15%", zIndex: "2" }}>
          {ticketType === 0 ? (
            <Box container style={{ marginTop: "7rem" }}>
              <Typography>Regular ticket</Typography>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                egestas elementum venenatis varius magna purus non phasellus. In
                varius turpis tempor, fames a, viverra adipiscing. In ac dolor,
                ac lacus maecenas vitae elementum.
              </p>
              <h3>price : 25$</h3>
            </Box>
          ) : ticketType === 1 ? (
            <Box container style={{ marginTop: "7rem" }}>
              <Typography>Regular+ ticket</Typography>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                egestas elementum venenatis varius magna purus non phasellus. In
                varius turpis tempor, fames a, viverra adipiscing. In ac dolor,
                ac lacus maecenas vitae elementum.
              </p>
              <h3>price : 35$</h3>
            </Box>
          ) : (
            <Box container style={{ marginTop: "7rem" }}>
              <Typography>Premium ticket</Typography>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                egestas elementum venenatis varius magna purus non phasellus. In
                varius turpis tempor, fames a, viverra adipiscing. In ac dolor,
                ac lacus maecenas vitae elementum.
              </p>
              <h3>price : 55$</h3>
            </Box>
          )}
        </div>

        <img
          style={{
            width: "350px",
            height: "700px",
            position: "relative",
            top: "280px",
            left: "100px",
            zIndex: "0",
          }}
          src={ticket_bond}
        />
      </div>

      <Footer />
    </>
  );
};

export default LargeScreen;

import React, { useState, useEffect } from "react";
import "./TicketPage.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/NavBar";
import ticket_bond from "../../iamges/ticket_bond.png";
import SucceededPage from "./SucceededPage/SucceededPage";
import axios from "axios";
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

import { Breakpoint } from "react-socks";

import SmallScreen from "./SmallScreen/SmallScreen";
import LargeScreen from "./LargeScreen/LargeScreen";

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

const TicketPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hour, setHour] = useState(null);
  const [visitorAmount, setVisitorsAmount] = useState(1);

  const [selectedDate, handleDateChange] = useState(new Date());

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  //tabvalue is ticket type
  const [ticketType, setTicketType] = useState(0);
  const [succeededUI, setSucceededUI] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const [value, setValue] = useState(new Date());

  useEffect(() => {
    if (succeeded) {
      setSucceededUI(true);
    }
  }, [succeeded]);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const useStyles = makeStyles({
    root: {
      "& label": {
        marginTop: -3, // fix the icon alignment issue
        backgroundColor: "green",
      },
    },
    label: {
      display: "inline-flex",
      alignItems: "center",
    },
  });

  const onTabValueChange = (event, newValue) => {
    console.log(newValue);
    console.log("ticket type : ", ticketType);
    setTicketType(newValue);
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const onHourChange = (event) => {
    setHour(event.target.value);
  };

  const handleSubmit = async (ev) => {
    console.log("ev : ", ev.target.value);
    ev.preventDefault();
    setProcessing(true);

    console.log({
      firstName,
      lastName,
      email,
      visitorAmount,
      selectedDate,
      hour,
      ticketType,
    });

    await fetch("http://localhost:8888/create-ticket-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticketType,
        visitorAmount,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(async (data) => {
        console.log(data);
        setClientSecret(data.clientSecret);

        const payload = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

        if (payload.error) {
          setError(`Payment failed ${payload.error.message}`);
          setProcessing(false);
        } else {
          setError(null);
          setProcessing(false);
          setSucceeded(true);
          axios.post("http://localhost:8888/ticket_sold", {
            firstName,
            lastName,
            email,
            visitorAmount,
            selectedDate,
            hour,
            ticketType,
            phoneNumber,
          });
        }
      });
  };

  return (
    <>
      <Breakpoint customQuery='(min-width: 376px)'>
        <LargeScreen
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          setPhoneNumber={setPhoneNumber}
          handleDateChange={handleDateChange}
          onHourChange={onHourChange}
          setVisitorsAmount={setVisitorsAmount}
          succeededUI={succeededUI}
          visitorAmount={visitorAmount}
          firstName={firstName}
          lastName={lastName}
          email={email}
          selectedDate={selectedDate}
          hour={hour}
          phoneNumber={phoneNumber}
          ticketType={ticketType}
          onTabValueChange={onTabValueChange}
          a11yProps={a11yProps}
          handleSubmit={handleSubmit}
          disabled={disabled}
          handleChange={handleChange}
          processing={processing}
          succeeded={succeeded}
        />
      </Breakpoint>
      <Breakpoint customQuery='(max-width: 376px)'>
        <SmallScreen
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          setPhoneNumber={setPhoneNumber}
          handleDateChange={handleDateChange}
          onHourChange={onHourChange}
          setVisitorsAmount={setVisitorsAmount}
          succeededUI={succeededUI}
          visitorAmount={visitorAmount}
          firstName={firstName}
          lastName={lastName}
          email={email}
          selectedDate={selectedDate}
          hour={hour}
          phoneNumber={phoneNumber}
          ticketType={ticketType}
          onTabValueChange={onTabValueChange}
          a11yProps={a11yProps}
          handleSubmit={handleSubmit}
          disabled={disabled}
          handleChange={handleChange}
          processing={processing}
          succeeded={succeeded}
        />
      </Breakpoint>
    </>
  );
};

export default TicketPage;

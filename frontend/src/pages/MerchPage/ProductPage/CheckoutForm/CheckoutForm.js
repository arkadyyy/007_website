import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Container, Box, TextField } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isEmail";
import SucceededPage from "./SucceededPage/SucceededPage";
import "./CheckoutForm.css";
import axios from "axios";

export default withRouter(function CheckoutForm({
  setCheckoutDisplay,
  match,
  history,
  product,
}) {
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

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("test123");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAdress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [succeededUI, setSucceededUI] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axios
      .get("https://geolocation-db.com/json/")
      .then((res) => setCountry(res.data.country_code));
  }, []);

  useEffect(() => {
    if (succeeded) {
      setSucceededUI(true);
    }
  }, [succeeded]);

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    await fetch("http://localhost:8888/create-product-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: match.params.product_id.replace("}", ""),
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
        }
      });
  };

  return (
    <>
      <Button
        style={{ textTransform: "None" }}
        onClick={() => setCheckoutDisplay(false)}
      >
        <ArrowBackIosIcon />
        Back
      </Button>
      {succeededUI ? (
        <SucceededPage
          email={email}
          phoneNumber={phoneNumber}
          address={address}
          product={product}
          firstName={firstName}
          lastName={lastName}
          country={country}
        />
      ) : (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "5rem",
            width: "80%",
          }}
          component='form'
          id='payment-form'
          onSubmit={handleSubmit}
        >
          <TextField
            // helperText={!phoneValid ? "The phone number is incorrect" : ""}
            label='First Name'
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            // helperText={!phoneValid ? "The phone number is incorrect" : ""}
            label='Last Name'
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => setEmailValid(isEmail(e.target.value))}
            helperText={!emailValid ? "The email is incorrect" : ""}
            value={email}
            type='email'
            label='email'
          />
          <TextField
            // helperText={!phoneValid ? "The phone number is incorrect" : ""}
            label='phone number'
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <TextField
            helperText={false ? "Please select your currency" : ""}
            error={false}
            label='address'
            onChange={(e) => setAdress(e.target.value)}
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

          {/* Show any error that happens when processing the payment */}
          {error && (
            <div style={{ backgroundColor: "red" }} role='alert'>
              {error}
            </div>
          )}
          {/* Show a success message upon completion */}
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment succeeded, see the result in your
            <a href={`https://dashboard.stripe.com/test/payments`}>
              {" "}
              Stripe dashboard.
            </a>{" "}
            Refresh the page to pay again.
          </p>
        </Box>
      )}
    </>
  );
});

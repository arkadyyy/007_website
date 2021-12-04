import React, { useEffect } from "react";
import { Button, Container, Box, Typography } from "@material-ui/core";
import axios from "axios";
import { withRouter } from "react-router-dom";

const SucceededPage = withRouter(
  ({
    history,
    product,
    phoneNumber,
    email,
    address,
    firstName,
    lastName,
    country,
  }) => {
    useEffect(() => {
      axios.post("http://localhost:8888/product_sold", {
        ...product,
        phoneNumber,
        email,
        address,
        firstName,
        lastName,
        country,
      });
    }, []);
    return (
      <>
        <Box>
          <Typography>Your Purchase is on the way</Typography>
          <Typography>
            Check your email , We send you an email with a recipt
          </Typography>
          <Button onClick={() => history.push("/merch")}>Back To Shop</Button>
        </Box>
      </>
    );
  }
);

export default SucceededPage;

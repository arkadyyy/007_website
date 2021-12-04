import { Container, Box, Button, FormControl, Input } from "@material-ui/core";
import React from "react";
import omega_watch from "../../iamges/omega_watch.png";
import { withRouter } from "react-router-dom";

const Product = withRouter(({ item, history, currency, selectedCurrency }) => {
  return (
    <>
      <Box
        style={{
          border: "2px solid #C4C4C4",
          width: "300px",
          height: "370px",
          display: "flex",
          alignItems: "center",
          justifyContent: " center",
          flexDirection: "column",
          boxShadow: "2px 2px 5px #aaaaaa",
        }}
      >
        <img
          style={{ width: "120px", height: "150px" }}
          src={item.images[0].picture_url}
        ></img>
        <h2
          style={{
            textAlign: "center",
            fontSize: "15px",
            backgroundColor: "#EEE1E1",
            width: "96%",
            padding: "0.4rem",
          }}
        >
          {item.product_name}
        </h2>
        <Button
          style={{
            textTransform: "none",
            border: "1px solid #232020",
            padding: "4px 40px",
            marginTop: "1.4rem",
          }}
          onClick={() => {
            history.push(
              `/shop/${item.product_id}}/${selectedCurrency}/${currency}`
            );
            console.log(item.product_id);
          }}
        >
          Buy Now
        </Button>
      </Box>
    </>
  );
});

export default Product;

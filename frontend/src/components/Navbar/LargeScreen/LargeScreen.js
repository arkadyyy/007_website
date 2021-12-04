import React from "react";
import { Container, List, ListItem, Button, Box } from "@material-ui/core";
import "../NavBar.css";
import whiteLogo from "../../../iamges/007_logo_white.png";
import blackLogo from "../../../iamges/007_logo_black.png";
import { withRouter } from "react-router-dom";

const LargeScreen = ({ color, history, notFoundPage }) => {
  return (
    <>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        style={{
          zIndex: 400,
          marginTop: "2rem",
          position: "absolute",
          left: "0",
          right: "0",
          margin: "0 auto",
        }}
      >
        <img
          src={color === "white" ? whiteLogo : blackLogo}
          style={{ width: "140px", height: "50px", marginTop: "2rem" }}
        />
        <h4
          className='navbar_subheader'
          style={{ color: color === "white" ? "white" : "black" }}
        >
          Inside The World Of James Bond
        </h4>

        {notFoundPage === false ? (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            style={{
              zIndex: 400,
            }}
          >
            <Button
              className='button'
              style={{
                textTransform: "none",
                color: color === "white" ? "white" : "black",
                marginRight: "2rem",
                marginLeft: "2rem",
              }}
              onClick={() => history.push("/")}
            >
              Home
            </Button>
            <Button
              className='button'
              style={{
                textTransform: "none",
                color: color === "white" ? "white" : "black",
                marginRight: "2rem",
                marginLeft: "2rem",
              }}
              onClick={() => history.push("/ticket")}
            >
              Tickets
            </Button>

            <Button
              className='button'
              style={{
                textTransform: "none",
                color: color === "white" ? "white" : "black",
                marginRight: "2rem",
                marginLeft: "2rem",
              }}
              onClick={() => history.push("/cars")}
            >
              The Cars
            </Button>

            <Button
              className='button'
              style={{
                textTransform: "none",
                color: color === "white" ? "white" : "black",
                marginLeft: "2rem",
              }}
              onClick={() => history.push("/merch")}
            >
              Store
            </Button>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default LargeScreen;

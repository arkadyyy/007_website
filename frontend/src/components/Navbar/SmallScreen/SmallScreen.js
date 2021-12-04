import React from "react";
import { Container, List, ListItem, Button, Box } from "@material-ui/core";
import "../NavBar.css";
import whiteLogo from "../../../iamges/007_logo_white.png";
import blackLogo from "../../../iamges/007_logo_black.png";
import { withRouter } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

const SmallScreen = ({ color, history, notFoundPage }) => {
  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem",
        }}
      >
        <img
          src={color === "white" ? whiteLogo : blackLogo}
          style={{ width: "100px", height: "50px" }}
        />
        <Menu right>
          <a id='home' className='menu-item' href='/'>
            Home
          </a>
          <a id='about' className='menu-item' href='/about'>
            About
          </a>
          <a id='contact' className='menu-item' href='/contact'>
            Contact
          </a>
        </Menu>
      </Box>
    </>
  );
};

export default SmallScreen;

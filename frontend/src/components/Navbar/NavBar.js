import { Container, List, ListItem, Button, Box } from "@material-ui/core";
import "./NavBar.css";
import whiteLogo from "../../iamges/007_logo_white.png";
import blackLogo from "../../iamges/007_logo_black.png";
import React from "react";
import { withRouter } from "react-router-dom";
import { Breakpoint } from "react-socks";
import SmallScreen from "./SmallScreen/SmallScreen";
import LargeScreen from "./LargeScreen/LargeScreen";

const Navbar = withRouter(({ color, history, notFoundPage }) => {
  return (
    <>
      <Breakpoint customQuery='(min-width: 376px)'>
        <LargeScreen
          color={color}
          history={history}
          notFoundPage={notFoundPage}
        />
      </Breakpoint>
      <Breakpoint customQuery='(max-width: 376px)'>
        <SmallScreen
          color={color}
          history={history}
          notFoundPage={notFoundPage}
        />
      </Breakpoint>
    </>
  );
});

export default Navbar;

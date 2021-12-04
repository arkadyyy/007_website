import React from "react";
import Navbar from "../../../components/Navbar/NavBar";
import db7Homepage from "../../../iamges/db7_homepage.jpg";
import { Button, Container } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import "../HomePage.css";
import { Breakpoint } from "react-socks";
import LargeLandingPage from "./LargeScreen/LargeLandingPage";
import SmallLandingPage from "./SmallScreen/SmallLandingPage";
const Landing = withRouter(({ history }) => {
  return (
    <>
      <Breakpoint customQuery='(min-width: 376px)'>
        <LargeLandingPage />
      </Breakpoint>

      <Breakpoint customQuery='(max-width: 376px)'>
        <SmallLandingPage />
      </Breakpoint>
    </>
  );
});

export default Landing;

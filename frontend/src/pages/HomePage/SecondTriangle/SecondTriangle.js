import React from "react";
import { withRouter } from "react-router-dom";

import { Breakpoint } from "react-socks";
import "../HomePage.css";
import SmallScreen from "./SmallScreen/SmallScreen";
import LargeScreen from "./LargeScreen/LargeScreen";
const SecondTriangle = withRouter(({ history }) => {
  return (
    <>
      <Breakpoint customQuery='(min-width: 376px)'>
        <LargeScreen />
      </Breakpoint>
      <Breakpoint customQuery='(max-width: 376px)'>
        <SmallScreen />
      </Breakpoint>
    </>
  );
});

export default SecondTriangle;

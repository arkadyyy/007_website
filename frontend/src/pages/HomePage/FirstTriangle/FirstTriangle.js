import React from "react";
import { withRouter } from "react-router-dom";
import jaguar from "../../../iamges/jaguar_1.png";
import "../HomePage.css";
import FirstTriangleLargeScreen from "./LargeScreen/LargeScreen";
import FirstTriangleSmallScreen from "./SmallScreen/SmallScreen";
import { Breakpoint } from "react-socks";
const FirstTriangle = withRouter(({ history }) => {
  return (
    <>
      <Breakpoint customQuery='(min-width: 376px)'>
        <FirstTriangleLargeScreen />
      </Breakpoint>

      <Breakpoint customQuery='(max-width: 376px)'>
        <FirstTriangleSmallScreen />
      </Breakpoint>
    </>
  );
});

export default FirstTriangle;

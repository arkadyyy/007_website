import React from "react";
import { withRouter } from "react-router-dom";
import standing_bond from "../../../iamges/standing_bond.png";
import "../HomePage.css";
const BuyTicket = withRouter(({ history }) => {
  return (
    <>
      <div style={{ height: "130vh", overflow: "hidden" }}>
        <img
          style={{
            width: "400px",
            height: "800px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            objectFit: "contain",
            paddingRight: "4rem",
          }}
          src={standing_bond}
        ></img>
        <div
          style={{
            height: "50vh",
            backgroundColor: "#222322",
            position: "relative",
            top: "-180px",
          }}
        ></div>
      </div>
    </>
  );
});

export default BuyTicket;

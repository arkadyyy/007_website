import React from "react";
import { withRouter } from "react-router-dom";
import jaguar from "../../../../iamges/jaguar_1.png";
import "../../HomePage.css";
const FirstTriangleSmallScreen = withRouter(({ history }) => {
  return (
    <>
      <div
        style={{
          height: "48vh",
          overflow: "hidden",
        }}
      >
        <img
          style={{
            position: "relative",
            left: "-171px",
            top: "130px",
            width: "437px",
            height: "160px",
            zIndex: 3,
          }}
          src={jaguar}
        ></img>

        <div className='s_first_triangle'>
          <div className='s_text1'>
            <p className='s_sectionText'>
              It was Sean Connery’s impeccable “Bond,
              <br /> James Bond” in DR. NO that introduced an <br />{" "}
              enthusiastic 1962 audience to a character <br /> who was to define
              the expression “licence <br /> to kill”.
              <br /> But it was a little Sunbeam Alpine series II <br />{" "}
              convertible that set the pace for what has <br /> become <br />{" "}
              possibly the most enduring, iconic <br /> symbol of the entire 50
              years of the <br /> franchise: the James Bond car.
            </p>
          </div>
        </div>
      </div>
    </>
  );
});

export default FirstTriangleSmallScreen;

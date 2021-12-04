import React from "react";
import { withRouter } from "react-router-dom";
import jaguar from "../../../../iamges/jaguar_1.png";
import "../../HomePage.css";
const FirstTriangleLargeScreen = withRouter(({ history }) => {
  return (
    <>
      <div
        style={{
          height: "100vh",
        }}
      >
        <div className='rectangle'>
          <img
            style={{
              position: "relative",
              left: "-330px",
              top: "120px",
              width: "1277px",
              height: "550px",
              zIndex: 3,
            }}
            src={jaguar}
          ></img>
        </div>
        <div className='first_triangle'>
          <div className='text1'>
            <p className='sectionText'>
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

export default FirstTriangleLargeScreen;

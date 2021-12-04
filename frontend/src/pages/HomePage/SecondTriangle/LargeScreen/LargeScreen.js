import React from "react";

import defender from "../../../../iamges/defender_1.png";
import { Button, Container } from "@material-ui/core";
const LargeScreen = () => {
  return (
    <>
      <div
        style={{
          height: "130vh",
          marginBottom: "-9.8rem",
          overflow: "hidden",
          marginTop: "17rem",
        }}
      >
        <div className='rectangle2'>
          <div className='text2'>
            <p className='sectionText'>
              To celebrate 50 years of Bond, the National Motor
              <br /> Museum at Beaulieu has brought
              <br />
              together 50 iconic 007 vehicles. including not
              <br /> only such luminaries as Auric Goldfinger’s 1937 <br />{" "}
              Rolls-Royce Phantom III, the trusty DB5, and the <br /> BMW 750iL
              and much more
            </p>

            <Button
              style={{
                position: "relative",

                textTransform: "none",
                border: "1px solid #f4f4f4",
                color: "white",
                padding: "0.4rem 4rem",
              }}
            >
              See All Cars
            </Button>
          </div>
          <img
            style={{
              position: "relative",
              width: "900px",
              height: "700px",
              left: "530px",
              overflow: "hidden",
              zIndex: 322,
              top: "-100px",
            }}
            src={defender}
          ></img>
        </div>

        <div className='secend_triangle'></div>
      </div>
    </>
  );
};

export default LargeScreen;

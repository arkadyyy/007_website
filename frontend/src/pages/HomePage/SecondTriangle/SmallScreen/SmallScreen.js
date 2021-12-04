import React from "react";

import defender from "../../../../iamges/defender_1.png";
import { Button, Container } from "@material-ui/core";
const SmallScreen = () => {
  return (
    <>
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <div className='s_rectangle2'>
          <div className='s_text2'>
            <p className='s_sectionText'>
              To celebrate 50 years of Bond, the National Motor
              <br /> Museum at Beaulieu has brought
              <br />
              together 50 iconic 007 vehicles. including not
              <br /> only such luminaries as Auric Goldfinger’s 1937 <br />{" "}
              Rolls-Royce Phantom III, the trusty DB5, and the <br /> BMW 750iL
              and much more
            </p>

            <Button
              size={"small"}
              style={{
                position: "relative",
                fontSize: "12px",
                textTransform: "none",
                border: "1px solid #f4f4f4",
                color: "white",
                padding: "0.4rem 2rem",
              }}
            >
              See All Cars
            </Button>
          </div>
          <img
            style={{
              position: "relative",
              width: "400px",
              height: "200px",
              left: "50px",
              overflow: "hidden",
              zIndex: 322,
              top: "10px",
              objectFit: "contain",
            }}
            src={defender}
          ></img>
        </div>

        {/* <div className='secend_triangle'></div> */}
      </div>
    </>
  );
};

export default SmallScreen;

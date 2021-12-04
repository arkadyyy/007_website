import React from "react";
import { withRouter } from "react-router-dom";
import image_30 from "../../../../iamges/image_30.jpg";
import image_28 from "../../../../iamges/image_28.jpg";
import image_27 from "../../../../iamges/image_27.jpg";
import image_29 from "../../../../iamges/image_29.jpg";

import "../../HomePage.css";
const LargeScreen = withRouter(({ history }) => {
  return (
    <>
      <div className='musseum_div'>
        <div>
          <h1>The Car That Started It All</h1>
          <p>
            It was Sean Connery’s impeccable “Bond,
            <br /> James Bond” in DR. NO that introduced an <br /> enthusiastic
            1962 audience to a character <br /> who was to define the expression
            “licence <br /> to kill”.
            <br /> But it was a little Sunbeam Alpine series II <br />{" "}
            convertible that set the pace for what has <br /> become <br />{" "}
            possibly the most enduring, iconic <br /> symbol of the entire 50
            years of the <br /> franchise: the James Bond car.
          </p>
        </div>
        <div className='musseum_collage'>
          <div
            style={{
              position: "relative",
              right: "-230px",
              overflow: "hidden",
            }}
          >
            <img
              style={{
                position: "relative",
                left: "310px",
                top: "-30px",
                width: "300px",
                height: "300px",
                zIndex: 3,
                objectFit: "contain",
              }}
              src={image_30}
            ></img>
            <img
              style={{
                position: "relative",
                left: "-230px",
                top: "80px",
                width: "300px",
                height: "300px",
                zIndex: 5,
                objectFit: "contain",
              }}
              src={image_28}
            ></img>
            <img
              style={{
                position: "relative",
                left: "-200px",
                top: "120px",
                width: "300px",
                height: "300px",
                zIndex: 6,
                objectFit: "contain",
              }}
              src={image_27}
            ></img>
            <img
              style={{
                position: "relative",
                left: "100px",
                top: "-50px",
                width: "300px",
                height: "300px",
                zIndex: 4,
                objectFit: "contain",
              }}
              src={image_29}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
});

export default LargeScreen;

import React from "react";
import { withRouter } from "react-router-dom";
import image_30 from "../../../../iamges/image_30.jpg";
import image_28 from "../../../../iamges/image_28.jpg";
import image_27 from "../../../../iamges/image_27.jpg";
import image_29 from "../../../../iamges/image_29.jpg";

import "../../HomePage.css";
const SmallScreen = withRouter(({ history }) => {
  return (
    <>
      <div className='s_musseum_div'>
        <div>
          <h1
            style={{
              position: "relative",
              left: "10px",
              fontSize: "22px",
            }}
          >
            The Car That Started It All
          </h1>

          <div className='s_musseum_collage'>
            <p className='s_musseum_text'>
              It was Sean Connery’s impeccable “Bond,
              <br /> James Bond” in DR. NO that introduced an <br />{" "}
              enthusiastic 1962 audience to a character <br /> who was to define
              the expression “licence <br /> to kill”.
              <br /> But it was a little Sunbeam Alpine series II <br />{" "}
              convertible that set the pace for what has <br /> become <br />{" "}
              possibly the most enduring, iconic <br /> symbol of the entire 50
              years of the <br /> franchise: the James Bond car.
            </p>
            <div
              style={{ marginTop: "70px", height: "40vh", overflow: "hidden" }}
            >
              <img
                style={{
                  position: "relative",

                  width: "250px",
                  top: "20px",
                  left: "170px",
                  height: "200px",
                  zIndex: 3,
                  objectFit: "contain",
                }}
                src={image_30}
              ></img>
              <img
                style={{
                  position: "relative",
                  left: "190px",
                  top: "-40px",
                  width: "220px",
                  height: "200px",
                  zIndex: 6,
                  objectFit: "contain",
                }}
                src={image_28}
              ></img>
              <img
                style={{
                  position: "relative",
                  left: "-20px",
                  top: "-280px",
                  width: "220px",
                  height: "200px",
                  zIndex: 5,
                  objectFit: "contain",
                }}
                src={image_29}
              ></img>
              <img
                style={{
                  position: "relative",
                  left: "-20px",
                  top: "-590px",
                  width: "240px",
                  height: "150px",
                  zIndex: 4,
                  objectFit: "contain",
                }}
                src={image_27}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default SmallScreen;

import React from "react";

import Retro_Dark_Blue from "../../../../iamges/Retro_Dark_Blue.jpg";
import Zippo_Gold from "../../../../iamges/Zippo_Gold.jpg";
import swimshorts from "../../../../iamges/swimshorts.jpg";
import remotecontrolledcar from "../../../../iamges/remotecontrolledcar.jpg";
import keyring from "../../../../iamges/keyring.jpg";
import db6 from "../../../../iamges/db6.jpg";
import hat from "../../../../iamges/hat.jpg";

const SmallScreen = () => {
  return (
    <>
      <div className='s_store_div'>
        <div
          style={{
            // position: "relative",
            alignSelf: "center",
          }}
        >
          <img
            style={{
              position: "relative",
              left: "20px",
              top: "20px",
              width: "100px",
              height: "100px",
              zIndex: 4,
              objectFit: "contain",
            }}
            src={Retro_Dark_Blue}
          ></img>
          <img
            style={{
              position: "relative",
              left: "15px",
              top: "-20px",
              width: "100px",
              height: "100px",
              zIndex: 4,
              objectFit: "contain",
            }}
            src={Zippo_Gold}
          ></img>
          <img
            style={{
              position: "relative",
              left: "350px",
              top: "-60px",
              width: "100px",
              height: "100px",
              zIndex: 4,
              objectFit: "contain",
            }}
            src={swimshorts}
          ></img>
          <img
            style={{
              position: "relative",
              left: "130px",
              top: "160px",
              width: "100px",
              height: "100px",
              zIndex: 4,
              objectFit: "contain",
            }}
            src={remotecontrolledcar}
          ></img>
          <img
            style={{
              position: "relative",
              left: "95px",
              top: "60px",
              width: "100px",
              height: "100px",
              zIndex: 4,
              objectFit: "contain",
            }}
            src={keyring}
          ></img>
          <img
            style={{
              position: "relative",
              left: "40px",
              top: "-60px",
              width: "100px",
              height: "100px",
              zIndex: 4,
              objectFit: "contain",
            }}
            src={db6}
          ></img>
          <img
            style={{
              position: "relative",
              left: "65px",
              top: "-30px",
              width: "100px",
              height: "100px",
              zIndex: 4,
              objectFit: "contain",
            }}
            src={hat}
          ></img>
        </div>
      </div>
    </>
  );
};
export default SmallScreen;

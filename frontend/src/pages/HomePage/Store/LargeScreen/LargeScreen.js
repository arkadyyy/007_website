import React, { useEffect } from "react";
import { Tooltip } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Retro_Dark_Blue from "../../../../iamges/Retro_Dark_Blue.jpg";
import Zippo_Gold from "../../../../iamges/Zippo_Gold.jpg";
import swimshorts from "../../../../iamges/swimshorts.jpg";
import remotecontrolledcar from "../../../../iamges/remotecontrolledcar.jpg";
import keyring from "../../../../iamges/keyring.jpg";
import db6 from "../../../../iamges/db6.jpg";
import hat from "../../../../iamges/hat.jpg";
import "../../HomePage.css";
const LargeScreen = withRouter(({ shuffled, history }) => {
  useEffect(() => {
    console.log("shuffled : ", shuffled);
  }, [shuffled]);

  const imgArrPosition = [
    {
      left: "-100px",
      top: "-50px",
    },
    {
      left: "20px",
      top: "-20px",
    },
    {
      left: "250px",
      top: "-60px",
    },
    {
      left: "300px",
      top: "20px",
    },
    {
      left: "350px",
      top: "-60px",
    },
    {
      left: "300px",
      top: "60px",
    },
    {
      left: "-450px",
      top: "60px",
    },
  ];
  return (
    <>
      <div className='store_div'>
        <h1 style={{ marginBottom: "10rem" }}>Check Our Store</h1>
        <div style={{ position: "relative" }}>
          {shuffled.map((product, index) => (
            <Tooltip title={product.product_name}>
              <img
                onClick={() => {
                  history.push(`/shop/${product.product_id}}/USD/1`);
                }}
                className='store_product'
                style={{
                  position: "relative",
                  left: imgArrPosition[index].left,
                  top: imgArrPosition[index].top,
                }}
                src={product.images[0].picture_url}
              ></img>
            </Tooltip>
          ))}
          {/* <img
            className='store_product'
            style={{
              position: "relative",
              left: "-110px",
              top: "-50px",
            }}
            src={Retro_Dark_Blue}
          ></img>
          <img
            className='store_product'
            style={{
              position: "relative",
              left: "20px",
              top: "-20px",
            }}
            src={Zippo_Gold}
          ></img>
          <img
            className='store_product'
            style={{
              position: "relative",
              left: "250px",
              top: "-60px",
            }}
            src={swimshorts}
          ></img>
          <img
            className='store_product'
            style={{
              position: "relative",
              left: "300px",
              top: "20px",
            }}
            src={remotecontrolledcar}
          ></img>
          <img
            className='store_product'
            style={{
              position: "relative",
              left: "350px",
              top: "-60px",
            }}
            src={keyring}
          ></img>
          <img
            className='store_product'
            style={{
              position: "relative",
              left: "300px",
              top: "60px",
            }}
            src={db6}
          ></img>
          <img
            className='store_product'
            style={{
              position: "relative",
              right: "450px",
              top: "60px",
            }}
            src={hat}
          ></img> */}
        </div>
      </div>
    </>
  );
});
export default LargeScreen;

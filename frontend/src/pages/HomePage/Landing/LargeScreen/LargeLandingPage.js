import React from "react";
import Navbar from "../../../../components/Navbar/NavBar";
import db7Homepage from "../../../../iamges/db7_homepage.jpg";
import { Button, Container } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import "../../HomePage.css";

const LargeLandingPage = withRouter(({ history }) => {
  return (
    <>
      <div
        style={{
          height: "100vh",
          backgroundImage: `url(${db7Homepage})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <Navbar notFoundPage={false} color='white' />
        <div className='hexagon'>
          <div
            style={{
              position: "relative",
              top: "120px",
              left: "100px",
              paddingTop: "9rem",
            }}
          >
            <p className='opening_Text'>
              CELEBRATE 50 YEARS OF <br></br> 007’S MACHINES AT THE <br></br>
              NATIONAL MOTOR MUSEUM{" "}
            </p>

            <Button
              style={{
                position: "relative",
                marginTop: "11rem",
                textTransform: "none",
                border: "1px solid #f4f4f4",
                color: "white",
                padding: "0.4rem 4rem",
              }}
              onClick={() => history.push("/ticket")}
            >
              Get Tickets
            </Button>
          </div>
        </div>
      </div>
    </>
  );
});

export default LargeLandingPage;

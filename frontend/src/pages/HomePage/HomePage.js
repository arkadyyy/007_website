import React from "react";

import black_logo from "../../iamges/007_logo_black.png";

import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useHistory } from "react-router-dom";
import "./HomePage.css";

import Landing from "./Landing/Landing";
import FirstTriangle from "./FirstTriangle/FirstTriangle";
import Museum from "./Museum/Museum";
import Store from "./Store/Store";
import BuyTicket from "./BuyTicket/BuyTicket";
import SecondTriangle from "./SecondTriangle/SecondTriangle";
const HomePage = () => {
  const history = useHistory();

  return (
    <>
      <Landing />
      <FirstTriangle />
      <Museum />
      <Store />
      <BuyTicket />

      <div
        style={{
          height: "40vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            alignSelf: "center",
            fontWeight: "light",
            fontStyle: "italic",
            marginTop: "10rem",
          }}
        >
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        </h2>
      </div>

      <SecondTriangle />

      <Footer />
    </>
  );
};

export default HomePage;

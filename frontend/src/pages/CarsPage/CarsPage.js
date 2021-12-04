import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/NavBar";
import "./CarsPage.css";
import DB5 from "../../iamges/DB5.png";
import cj7 from "../../iamges/cj7.png";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { Button, Container } from "@material-ui/core";
const CarsPage = () => {
  let imgArr = [DB5, cj7];

  const [index, setindex] = useState(0);
  const [animate, setanimate] = useState(true);
  const [cars, setcars] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8888/the_cars").then((res) => {
      console.log("THE CARS : ", res.data);
      setcars(res.data);
    });
  }, []);

  return (
    <>
      <Navbar notFoundPage={false} />
      <div style={{ height: "120vh", overflow: "hidden" }}>
        <div className='triangle'></div>
        {cars ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2 style={{ position: "relative", left: "720px", top: "170px" }}>
                {cars[index].car_name}
              </h2>
              <img
                onAnimationEnd={() => {
                  setanimate(false);
                }}
                className={`${animate ? "animate" : null}  , car_image`}
                src={cars[index].car_image}
              />
            </div>
            <div className='detail_box'>
              <Container style={{ marginLeft: "5rem" }}>
                <h2 className='car_description_header'>
                  {cars[index].car_title}
                </h2>
                <p className='car_description'>{cars[index].car_description}</p>
              </Container>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "6rem",
                  marginLeft: "5rem",
                }}
              >
                <Button
                  onClick={() => {
                    setanimate(true);
                    setindex(index === 0 ? cars.length - 1 : index - 1);
                  }}
                >
                  <ArrowBack
                    style={{
                      color: "#786B6B",
                      width: "4rem",
                      height: "4rem",
                    }}
                  />
                </Button>
                <Button
                  onClick={() => {
                    setanimate(true);
                    setindex(index === cars.length - 1 ? 0 : index + 1);
                  }}
                >
                  <ArrowForward
                    style={{ color: "#786B6B", width: "4rem", height: "4rem" }}
                  />
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <Footer />
    </>
  );
};

export default CarsPage;

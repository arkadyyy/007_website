import React, { useEffect, useState } from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { getAllProducts } from "../../../store/actions/actions";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/NavBar";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { Button, Container, Box } from "@material-ui/core";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./ProductPage.css";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import Reviews from "./Reviews/Reviews";

const ProductPage = withRouter(({ history, match }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  console.log(products);
  const state = useSelector((state) => state);

  const [imageIndex, setImageIndex] = useState(0);
  const [checkoutDisplay, setCheckoutDisplay] = useState(false);
  const [reviewDisplay, setReviewDisplay] = useState(false);
  const [product, setproduct] = useState(null);

  const getProducts = () => {
    axios.get("http://localhost:8888/products").then((res) => {
      console.log(res);
      let products = res.data.products.map((product) => {
        let productImages = res.data.images.filter(
          (image) => image.product_id === product.product_id
        );

        return { ...product, images: productImages };
      });
      console.log("products : ", products);
      dispatch(getAllProducts(products));
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log("products : ", products);
    console.log("state : ", state);
    console.log(match.params.product_id);
    console.log(
      "$$$ ",
      products.find(
        (product) =>
          product.product_id === match.params.product_id.replace("}", "")
      )
    );
    setproduct(
      products.find(
        (product) =>
          product.product_id === match.params.product_id.replace("}", "")
      )
    );
  }, [products]);

  return (
    <>
      <Navbar notFoundPage={false} />

      {product ? (
        <>
          <div style={{ height: "120vh", overflow: "hidden" }}>
            {/* <div className='triangle'></div> */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <Box
                style={{
                  width: "100%",
                  height: "85vh",
                }}
              >
                <Button
                  style={{
                    textTransform: "none",
                    position: "relative",
                    margin: " 1rem 8rem",
                  }}
                  onClick={() => history.goBack()}
                >
                  <ArrowBackIosIcon /> Back
                </Button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginTop: "4rem",
                  }}
                >
                  <Button
                    onClick={() => {
                      console.log("imageIndex : ", imageIndex);
                      console.log("minus clicked");
                      let x =
                        imageIndex <= 0
                          ? product.images.length - 1
                          : imageIndex - 1;
                      setImageIndex(x);
                      console.log("x minus : ", x);
                    }}
                  >
                    <ArrowBack
                      style={{
                        color: "#EEE1E1",
                        width: "4rem",
                        height: "4rem",
                      }}
                    />
                  </Button>
                  <img
                    style={{
                      width: "350px",
                      height: "350px",
                    }}
                    src={product.images[imageIndex].picture_url}
                  ></img>
                  <Button
                    onClick={() => {
                      console.log("imageIndex : ", imageIndex);
                      console.log("plus clicked");
                      let x =
                        imageIndex >= product.images.length - 1
                          ? 0
                          : imageIndex + 1;
                      setImageIndex(x);
                      console.log("x plus : ", x);
                    }}
                  >
                    <ArrowForward
                      style={{
                        color: "#EEE1E1",
                        width: "4rem",
                        height: "4rem",
                      }}
                    />
                  </Button>
                </div>
              </Box>
              <div
                className={
                  checkoutDisplay ? "product_checkout_box" : "detail_box"
                }
              >
                <Container style={{ marginLeft: "5rem" }}>
                  {checkoutDisplay ? (
                    <>
                      <CheckoutForm
                        product={product}
                        setCheckoutDisplay={setCheckoutDisplay}
                      />
                    </>
                  ) : reviewDisplay ? (
                    <>
                      <Reviews
                        setReviewDisplay={setReviewDisplay}
                        product_id={product.product_id}
                      />
                    </>
                  ) : (
                    <>
                      <h2>{product.product_name}</h2>

                      <p className='car_description'>
                        {product.product_description}
                      </p>

                      <h4>
                        {(product.price * +match.params.currency).toFixed(2)}{" "}
                        {match.params.selectedCurrency}
                      </h4>
                      <Button
                        onClick={() => setCheckoutDisplay(true)}
                        style={{ textTransform: "none" }}
                      >
                        Buy Now
                      </Button>
                      <Button
                        onClick={() => setReviewDisplay(true)}
                        style={{ textTransform: "none" }}
                      >
                        Reviews
                      </Button>
                    </>
                  )}
                </Container>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ height: "100vh" }}></div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        </>
      )}

      <Footer />
    </>
  );
});

export default ProductPage;

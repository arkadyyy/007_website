import React, { useState, useEffect, useCallback } from "react";
import { useSelector, shallowEqual } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Container, Box, TextField } from "@material-ui/core";
import Stepper from "./Stepper";

const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
  })
);

export default function UpdateProduct({
  onUpdateClose,
  openUpdate,
  selected,
  setOpenUpdate,
}) {
  const classes = useStyles();
  const [images, setimages] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);

  const products = useSelector(
    (state) =>
      state.products.filter((product) => selected.includes(product.product_id)),
    shallowEqual
  );
  const [updatedProducts, setupdatedProducts] = useState([]);

  const [name, setname] = useState(null);
  const [price, setprice] = useState(null);
  const [instock, setinstock] = useState(null);
  const [category, setcategory] = useState([]);
  const [description, setdescription] = useState(null);
  const [product_id, setProduct_id] = useState(null);

  const onCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setcategory(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    console.log(activeStep);

    if (products.length > 0) {
      // if (updatedProducts.length > 0) {
      //   let currentProduct = updatedProducts.find(
      //     (product) =>
      //       product.product_id === updatedProducts[activeStep].product_id
      //   );
      //   let otherProduct = updatedProducts.filter(
      //     (product) =>
      //       product.product_id !== updatedProducts[activeStep].product_id
      //   );
      // } else {
      setupdatedProducts(products);
      setProduct_id(products[activeStep].product_id);
      // }

      // setupdatedProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      setProduct_id(products[activeStep].product_id);
    }
  }, [activeStep]);

  const getInputValue = (product_id, value) =>
    updatedProducts.find((product) => product.product_id === product_id)[value];

  const onUpdateProductsChange = (product_id, key, value) => {
    setupdatedProducts([
      ...updatedProducts.filter((product) => product.product_id !== product_id),
      {
        ...updatedProducts.find((product) => product.product_id === product_id),
        [key]: value,
      },
    ]);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          id='alert-dialog-title'
        >
          <div>
            <Button
              style={{
                textTransform: "none",
                color: "#223322",
                margin: " 1rem 0rem",
              }}
              onClick={() => setOpenUpdate(false)}
            >
              <ArrowBackIosIcon /> Back
            </Button>
          </div>
          <div style={{ marginLeft: "2rem" }}>
            Product Update -{" "}
            {products.length > 0 ? products[activeStep].product_name : ""}
          </div>
        </DialogTitle>
        <DialogContent>
          <Container>
            {updatedProducts.length > 0 ? (
              <Box
                component='form'
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete='off'
                style={{
                  display: "flex",
                  flexDirection: "column",

                  minHeight: "50vh",
                  padding: "2rem",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",

                    flex: 2,
                  }}
                >
                  <TextField
                    style={{ width: "70%" }}
                    className='textfield'
                    label={"Name"}
                    value={
                      updatedProducts.length > 0
                        ? getInputValue(product_id, "product_name")
                        : null
                    }
                    onChange={(e) => {
                      console.log("updatedProducts : ", updatedProducts);
                      onUpdateProductsChange(
                        product_id,
                        "product_name",
                        e.target.value
                      );
                    }}
                  />
                  <TextField
                    style={{ width: "70%" }}
                    className='textfield'
                    label={"Price"}
                    value={
                      updatedProducts.length > 0
                        ? getInputValue(product_id, "price")
                        : null
                    }
                    onChange={(e) => {
                      console.log("updatedProducts : ", updatedProducts);
                      onUpdateProductsChange(
                        product_id,
                        "price",
                        e.target.value
                      );
                    }}
                  />
                  <TextField
                    style={{ width: "70%" }}
                    className='textfield'
                    label={"In Stock"}
                    value={
                      updatedProducts.length > 0
                        ? getInputValue(product_id, "in_stock")
                        : null
                    }
                    onChange={(e) => {
                      console.log("updatedProducts : ", updatedProducts);
                      onUpdateProductsChange(
                        product_id,
                        "in_stock",
                        e.target.value
                      );
                    }}
                  />
                  <TextField
                    style={{ width: "70%" }}
                    className='textfield'
                    label={"Description"}
                    multiline
                    value={
                      updatedProducts.length > 0
                        ? getInputValue(product_id, "product_description")
                        : null
                    }
                    onChange={(e) => {
                      console.log("updatedProducts : ", updatedProducts);
                      onUpdateProductsChange(
                        product_id,
                        "product_description",
                        e.target.value
                      );
                    }}
                  />
                </Box>
              </Box>
            ) : (
              <>{null}</>
            )}
          </Container>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {products.length > 1 ? (
              <Stepper
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                length={products.length}
              />
            ) : null}

            <Button
              style={{
                textTransform: "none",
                color: "white",
                backgroundColor: "#223322",
                marginTop: "2rem",
                marginLeft: "2rem",
              }}
              onClick={() => onUpdateClose(updatedProducts)}
            >
              Update Products
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import React, { useState, useEffect, useCallback } from "react";
import { useSelector, shallowEqual } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DropzoneArea } from "material-ui-dropzone";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {
  Container,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import Stepper from "./Stepper";

const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
  })
);

export default function UpdateTicket({
  onUpdateClose,
  openUpdate,
  selected,
  setOpenUpdate,
}) {
  const classes = useStyles();
  const [images, setimages] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const tickets = useSelector(
    (state) => state.tickets.filter((ticket) => selected.includes(ticket)),
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

    if (tickets.length > 0) {
      console.log("TICKETS : ", tickets);
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
      setupdatedProducts(tickets);
      setProduct_id(tickets[activeStep].id);
      // }

      // setupdatedProducts(products);
    }
  }, [tickets]);

  useEffect(() => {
    if (tickets.length > 0) {
      setProduct_id(tickets[activeStep].id);
    }
  }, [activeStep]);

  const getInputValue = (product_id, value) =>
    updatedProducts.find((product) => product.id === product_id)[value];

  const onUpdateProductsChange = (product_id, key, value) => {
    setupdatedProducts([
      ...updatedProducts.filter((ticket) => ticket.id !== product_id),
      {
        ...updatedProducts.find((ticket) => ticket.id === product_id),
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
        <DialogTitle id='alert-dialog-title'>
          Ticket Update -{" "}
          {tickets.length > 0 ? tickets[activeStep].ticket_type : ""}
        </DialogTitle>
        <DialogContent>
          <Container>
            <Button
              style={{
                textTransform: "none",
                position: "relative",
                margin: " 1rem 8rem",
              }}
              onClick={() => console.log("updatedProducts : ", updatedProducts)}
            >
              <ArrowBackIosIcon /> Back
            </Button>

            <Stepper
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              length={tickets.length}
            />
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
                  justifyContent: "space-between",
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
                        ? getInputValue(product_id, "ticket_type")
                        : null
                    }
                    onChange={(e) => {
                      console.log("updatedProducts : ", updatedProducts);
                      onUpdateProductsChange(
                        product_id,
                        "ticket_type",
                        e.target.value
                      );

                      // setupdatedProducts([
                      //   ...updatedProducts.filter(
                      //     (product) => product.product_id !== product_id
                      //   ),
                      //   {
                      //     ...updatedProducts.find(
                      //       (product) => product.product_id === product_id
                      //     ),
                      //     product_name: e.target.value,
                      //   },
                      // ]);
                    }}
                  />
                </Box>
              </Box>
            ) : (
              <>
                <h2>ssssssssss</h2>
              </>
            )}
            {/* </Container> */}
          </Container>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={onUpdateClose}>Next</Button> */}
          <Button onClick={() => onUpdateClose(updatedProducts)} autoFocus>
            Update Ticket
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

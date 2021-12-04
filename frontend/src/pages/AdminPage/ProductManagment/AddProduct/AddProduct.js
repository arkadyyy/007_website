import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.css";
import {
  Button,
  Container,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { DropzoneArea } from "material-ui-dropzone";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
  })
);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const AddProduct = ({ setaddProductDisplayed, getProducts }) => {
  const classes = useStyles();

  const [name, setname] = useState(null);
  const [price, setprice] = useState(null);
  const [instock, setinstock] = useState(null);
  const [category, setcategory] = useState([]);
  const [description, setdescription] = useState(null);
  const [images, setimages] = useState([]);
  const [uploadedImages, setuploadedImages] = useState([]);
  const [allowdToUpload, setallowdToUpload] = useState(true);

  const [displayMsg, setdisplayMsg] = useState(false);
  const [msg, setmsg] = useState("");

  useEffect(() => {
    console.log(displayMsg);
    setTimeout(() => {
      setdisplayMsg(false);
    }, 4700);
  }, [displayMsg]);

  const handleAdd = (newFiles) => {
    console.log(newFiles);
    newFiles = newFiles.filter(
      (file) => !images.find((f) => f.data === file.data)
    );
    setimages([...images, ...newFiles]);
  };

  const handleDelete = (deleted) => {
    setimages(images.filter((f) => f !== deleted));
  };

  //~~~~

  const imageUpload = (images) => {
    console.log("images : ", images);
    let readyImages = [];
    images.forEach((image) => {
      axios.get("http://localhost:8888/s3_url").then(async (res) => {
        await fetch(res.data.url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: image,
        }).then((res) => {
          console.log("res :", res);

          let url = res.url.split("?")[0];
          console.log("~", { name: image.name, url });

          readyImages.push({ name: image.name, url });
          console.log("~~", readyImages);
          setuploadedImages([...uploadedImages, ...readyImages]);
          setmsg("Product Uploaded Succssesfuly");
          setallowdToUpload(false);
        });
      });
    });
  };

  const onAddProduct = async (
    name,
    price,
    instock,
    category,
    description,
    images
  ) => {
    console.log("images : ", images);

    // console.log({ name, price, instock, category, description, images });
    axios
      .post("http://localhost:8888/new_product", {
        name,
        price,
        instock,
        category: category.join(","),
        description,
        images,
      })

      .then((res) => {
        console.log(res);
        getProducts();
        setallowdToUpload(true);
        setdisplayMsg(true);
      })
      .catch((err) => console.log(err));
    setimages([]);
    setname("");
    setprice("");
    setinstock("");
    setcategory([]);
    setdescription("");
    setuploadedImages([]);
  };

  const onCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setcategory(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <Container>
        <Button
          style={{
            textTransform: "none",
            position: "relative",
            margin: " 1rem 8rem",
          }}
          onClick={() => setaddProductDisplayed(false)}
        >
          <ArrowBackIosIcon /> Back
        </Button>
        <Container>
          <Typography>Add product</Typography>
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
                value={name}
                label={"Name"}
                onChange={(e) => setname(e.target.value)}
              />
              <TextField
                style={{ width: "70%" }}
                className='textfield'
                label={"Price"}
                value={price}
                onChange={(e) => setprice(e.target.value)}
              />

              <TextField
                style={{ width: "70%" }}
                className='textfield'
                label={"In Stock"}
                value={instock}
                onChange={(e) => {
                  setinstock(e.target.value);
                  console.log(e.target.value);
                }}
              />
              <FormControl
                variant='standard'
                style={{ width: "70%" }}
                sx={{ m: 1, minWidth: 70 }}
              >
                <InputLabel id='demo-simple-select-standard-label'>
                  Category
                </InputLabel>
                <Select
                  multiple
                  labelId='demo-simple-select-standard-label'
                  id='demo-simple-select-standard'
                  value={category}
                  onChange={(e) => onCategoryChange(e)}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {[
                    "Collectiables",
                    "Luxury",
                    "Gifts",
                    "Clothing",
                    "Accesories",
                    "Homeware",
                  ].map((category) => (
                    <MenuItem value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                multiline
                rows={2}
                rowsMax={4}
                label={"Description"}
                value={description}
                variant='outlined'
                style={{ width: "70%", marginTop: "1.4rem" }}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Box>
            <Box style={{ flex: 1 }}>
              <Typography>Product Iamges</Typography>

              <DropzoneArea
                acceptedFiles={["image/*"]}
                showPreviews={true}
                showPreviewsInDropzone={false}
                previewGridProps={{
                  container: { spacing: 1, direction: "row" },
                }}
                useChipsForPreview
                previewChipProps={{ classes: { root: classes.previewChip } }}
                previewText='Selected files'
                fileObjects={images}
                // onAdd={handleAdd}
                // onAdd={() => imageUpload()}
                onDelete={handleDelete}
                onChange={imageUpload}
              />
            </Box>
          </Box>
        </Container>
        <Button
          // disabled={allowdToUpload}
          style={{
            textTransform: "none",
            position: "relative",
            margin: " 1rem 8rem",
            border: "2px solid #232020",
          }}
          onClick={() =>
            onAddProduct(
              name,
              price,
              instock,
              category,
              description,
              uploadedImages
            )
          }
        >
          {!allowdToUpload ? "Add Product" : "please fill all fields"}
        </Button>

        <Snackbar
          open={displayMsg}
          autoHideDuration={6000}
          // onClose={handleClose}
        >
          <Alert
            // onClose={handleClose}
            severity='error'
            sx={{ width: "100%", backgroundColor: "#222322" }}
          >
            {msg}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default AddProduct;

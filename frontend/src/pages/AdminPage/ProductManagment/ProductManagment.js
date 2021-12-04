import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddProduct from "./AddProduct/AddProduct";
import axios from "axios";
import { getAllProducts } from "../../../store/actions/actions";
import ProductTable from "./ProductTable/ProductTable";
import { Box, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
const ProductManagment = () => {
  const [addProductDisplayed, setaddProductDisplayed] = useState(false);
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  const getProducts = () => {
    axios.get("http://localhost:8888/products").then((res) => {
      console.log(res);
      let products = res.data.products.map((product) => {
        let productImages = res.data.images.filter(
          (image) => image.product_id === product.product_id
        );

        return { ...product, images: productImages };
      });

      dispatch(getAllProducts(products));
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {addProductDisplayed ? (
        <AddProduct
          getProducts={getProducts}
          setaddProductDisplayed={setaddProductDisplayed}
        />
      ) : (
        <>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              margin: "0 auto",
            }}
          >
            <Box>
              <h2>Product managment</h2>
              <Button
                style={{
                  backgroundColor: "#222322",
                  color: "white",
                  textTransform: "none",
                  marginBottom: "1rem",
                }}
                onClick={() => setaddProductDisplayed(true)}
              >
                <Add />
                Add Product
              </Button>
            </Box>
            <ProductTable getProducts={getProducts} products={products} />
          </Box>
        </>
      )}
    </>
  );
};

export default ProductManagment;

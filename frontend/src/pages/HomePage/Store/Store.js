import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import { Breakpoint } from "react-socks";
import LargeScreen from "./LargeScreen/LargeScreen";
import SmallScreen from "./SmallScreen/SmallScreen";
import { getAllProducts } from "../../../store/actions/actions";
import "../HomePage.css";
import { useSelector, useDispatch } from "react-redux";

const Store = withRouter(({ history }) => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  // const shuffled = products.sort(() => Math.random() - 0.5)

  const [shuffled, setshuffled] = useState([]);

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
    setshuffled(products.sort(() => Math.random() - 0.5).splice(0, 7));
  }, [products]);
  return (
    <>
      <Breakpoint customQuery='(min-width: 376px)'>
        <LargeScreen shuffled={shuffled} />
      </Breakpoint>
      <Breakpoint customQuery='(max-width: 376px)'>
        <SmallScreen shuffled={shuffled} />
      </Breakpoint>
    </>
  );
});

export default Store;

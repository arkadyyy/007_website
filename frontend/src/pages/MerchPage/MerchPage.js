import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/NavBar";
import SearchBox from "./SearchBox/SearchBox";
import {
  Container,
  Box,
  Button,
  FormControl,
  Input,
  Grid,
} from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import { useSelector, useDispatch } from "react-redux";
import Product from "./Product";
import axios from "axios";
import { getAllProducts } from "../../store/actions/actions";
// currency access key -> 3a89d280-3d77-11ec-8cf6-eb14e239a92e
const MerchPage = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [startItem, setstartItem] = useState(0);
  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState({
    USD: 1,
    EUR: 1,
    JPD: 1,
    ILS: 1,
  });
  const [selectedCurrency, setselectedCurrency] = useState("USD");
  const onPageChange = (event, value) => {
    setPage(value);
    if (value === 1) {
      setstartItem(0);
    } else {
      setstartItem((value - 1) * 10);
    }
  };

  const _products = useSelector((state) => state.products);

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
    axios
      .get(
        "https://freecurrencyapi.net/api/v2/latest?apikey=3a89d280-3d77-11ec-8cf6-eb14e239a92e"
      )
      .then((res) => {
        setCurrency({
          USD: 1,
          EUR: res.data.data.EUR,
          JPY: res.data.data.JPY,
          ILS: res.data.data.ILS,
        });
        console.log("$$$~currency : ", res.data.data);
      });
  }, []);

  useEffect(() => {
    console.log(page);
    getProducts();
  }, [page]);

  useEffect(() => {
    setProducts(_products);
  }, [_products]);

  useEffect(() => {
    console.log("products changed !!!!!");
    console.log(products);
  }, [products]);

  useEffect(() => {
    console.log("selectedCurrency : ", selectedCurrency);
    console.log("currency : ", currency);
    console.log(currency[selectedCurrency]);
  }, [selectedCurrency]);

  return (
    <>
      <Navbar notFoundPage={false} />

      <Box style={{ overflow: "hidden" }}>
        <SearchBox
          setselectedCurrency={setselectedCurrency}
          products={products}
          setProducts={setProducts}
        />
        <Container>
          <Grid
            container
            layout={"row"}
            spacing={6}
            justify='flex-start'
            style={{
              position: "relative",
              marginTop: "24rem",
              marginBottom: "5rem",
            }}
          >
            {products.slice(startItem, page * 10).map((item) => (
              <Grid item lg={4} xs={12}>
                <Product
                  selectedCurrency={selectedCurrency}
                  currency={currency[selectedCurrency]}
                  item={item}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
        <Box
          style={{ display: "flex", justifyContent: "center", padding: "3rem" }}
        >
          <Pagination
            style={{ alignSelf: "center" }}
            page={page}
            onChange={onPageChange}
            count={products.length / 10 <= 1 ? 1 : products.length / 10}
          />
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default MerchPage;

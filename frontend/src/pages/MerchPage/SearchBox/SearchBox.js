import {
  Container,
  Box,
  Button,
  FormControl,
  Input,
  Tabs,
  Tab,
  Typography,
  Slider,
  TextField,
  Grid,
} from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {} from "@material-ui/core/styles";
import "../Merch.css";
import { Breakpoint } from "react-socks";
import LargeScreen from "./LargeScreen/LargeScreen";
import SmallScreen from "./SmallScreen/SmallScreen";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const useStyles = {
  root: {
    "& label": {
      marginTop: -3, // fix the icon alignment issue
      backgroundColor: "green",
    },
  },
  label: {
    display: "inline-flex",
    alignItems: "center",
  },
};

const SearchBox = ({ setProducts, products, setselectedCurrency }) => {
  // const classes = useStyles();

  const _products = useSelector((state) => state.products);

  const [tabValue, settabValue] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [priceRange, setpriceRange] = useState([null, null]);
  const [categoryFilter, setcategoryFilter] = useState({
    Whats_new: false,
    Collectiables: false,
    Luxury: false,
    Gifts: false,
    Clothing: false,
    Homeware: false,
    Accesories: false,
  });
  const [sortBy, setsortBy] = useState({});
  const [search, setsearch] = useState("");

  const onCategoryFilterChange = (type) => {
    setcategoryFilter({
      ...categoryFilter,
      [`${type}`]: !categoryFilter[type],
    });
  };
  const onCurrencyChange = (currency) => {
    setCurrency(currency);
    setselectedCurrency(currency);
  };

  const onTabValueChange = (event, newValue) => {
    settabValue(newValue);
  };

  const onSearchChange = (products) => {
    console.log(search);
    if (search.length === 0) {
      setProducts(products);
    } else {
      let filteredBySearch = products.filter((product) => {
        console.log("1 ", product.product_name.toLowerCase());
        console.log("2 ", search.toLowerCase());
        return product.product_name
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      console.log("filteredBySearch : ", filteredBySearch);
      setProducts(filteredBySearch);
    }
  };

  const onCategoryChange = (products) => {
    let categoryFilterString = Object.entries(categoryFilter)
      .filter(([key, value]) => {
        if (value === true) {
          return key;
        }
      })
      .map((category) => category[0]);

    if (categoryFilterString.length === 0) {
      setProducts(products);
    } else {
      let filteredBySearch = products.filter((product) =>
        product.category
          .split(",")
          .some((category) => categoryFilterString.includes(category))
      );

      setProducts(filteredBySearch);
    }
  };

  useEffect(() => {
    onSearchChange(_products);
  }, [search]);

  useEffect(() => {
    onCategoryChange(_products);
  }, [categoryFilter]);

  return (
    <>
      <Breakpoint customQuery='(min-width: 376px)'>
        <LargeScreen
          tabValue={tabValue}
          currency={currency}
          priceRange={priceRange}
          categoryFilter={categoryFilter}
          search={search}
          setsearch={setsearch}
          onCurrencyChange={onCurrencyChange}
          onTabValueChange={onTabValueChange}
          onCategoryFilterChange={onCategoryFilterChange}
          setpriceRange={setpriceRange}
          onCurrencyChange={onCurrencyChange}
        />
      </Breakpoint>
      <Breakpoint customQuery='(max-width: 376px)'>
        <SmallScreen
          tabValue={tabValue}
          currency={currency}
          priceRange={priceRange}
          categoryFilter={categoryFilter}
          setcategoryFilter={setcategoryFilter}
          search={search}
          setsearch={setsearch}
          onCurrencyChange={onCurrencyChange}
          onTabValueChange={onTabValueChange}
          onCategoryFilterChange={onCategoryFilterChange}
          setpriceRange={setpriceRange}
          onCurrencyChange={onCurrencyChange}
        />
      </Breakpoint>
    </>
  );
};

export default SearchBox;

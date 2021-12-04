import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
import PropTypes from "prop-types";
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
const useStyles = makeStyles({
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
});

const SmallScreen = ({
  tabValue,
  currency,
  priceRange,
  categoryFilter,
  search,
  setsearch,
  onTabValueChange,
  onCategoryFilterChange,
  setpriceRange,
  onCurrencyChange,
}) => {
  const classes = useStyles();
  return (
    <>
      <Box
        style={{
          border: "2px solid #C4C4C4",
          borderRight: "0px transparent",
          position: "relative",
          // width: "91%",
          // height: "14rem",
          top: "17rem",
          // left: "8.7rem",
          overflow: "hidden",
        }}
      >
        <Box margin={3}>
          <Tabs
            style={{
              width: "100%",
            }}
            orientation='vertical'
            variant='scrollable'
            value={tabValue}
            onChange={onTabValueChange}
            textColor='secondary'
            indicatorColor='secondary'
            aria-label='secondary tabs example'
          >
            <Tab label='Category' {...a11yProps(0)} />
            <Tab label='Price Range' {...a11yProps(1)} />
            <Tab label='Sort By' {...a11yProps(2)} />
            <Tab label='Search' {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <Grid>
              <Grid className='search_select' xs={6} item>
                {categoryFilter.Whats_new ? (
                  <CheckIcon />
                ) : (
                  <CheckIcon style={{ fill: "transparent" }} />
                )}
                <Button
                  onClick={() => onCategoryFilterChange("Whats_new")}
                  style={{ textTransform: "none" }}
                >
                  {" "}
                  Whats New
                </Button>
              </Grid>

              <Grid className='search_select' xs={6} item>
                {categoryFilter.Luxury ? (
                  <CheckIcon />
                ) : (
                  <CheckIcon style={{ fill: "transparent" }} />
                )}
                <Button
                  onClick={() => onCategoryFilterChange("Luxury")}
                  style={{ textTransform: "none" }}
                >
                  Luxury
                </Button>
              </Grid>

              <Grid className='search_select' xs={6} item>
                {categoryFilter.Gifts ? (
                  <CheckIcon />
                ) : (
                  <CheckIcon style={{ fill: "transparent" }} />
                )}
                <Button
                  onClick={() => onCategoryFilterChange("Gifts")}
                  style={{ textTransform: "none" }}
                >
                  Gifts
                </Button>
              </Grid>
              <Grid className='search_select' xs={6} item>
                {categoryFilter.Clothing ? (
                  <CheckIcon />
                ) : (
                  <CheckIcon style={{ fill: "transparent" }} />
                )}
                <Button
                  onClick={() => onCategoryFilterChange("Clothing")}
                  style={{ textTransform: "none" }}
                >
                  Clothing
                </Button>
              </Grid>
              <Grid className='search_select' xs={6} item>
                {categoryFilter.Accesories ? (
                  <CheckIcon />
                ) : (
                  <CheckIcon style={{ fill: "transparent" }} />
                )}
                <Button
                  onClick={() => onCategoryFilterChange("Accesories")}
                  style={{ textTransform: "none" }}
                >
                  Accesories
                </Button>
              </Grid>
              <Grid className='search_select' xs={6} item>
                {categoryFilter.Homeware ? (
                  <CheckIcon />
                ) : (
                  <CheckIcon style={{ fill: "transparent" }} />
                )}
                <Button
                  onClick={() => onCategoryFilterChange("Homeware")}
                  style={{ textTransform: "none" }}
                >
                  Homeware
                </Button>
              </Grid>
              <Grid className='search_select' xs={6} item>
                {categoryFilter.Collectiables ? (
                  <CheckIcon />
                ) : (
                  <CheckIcon style={{ fill: "transparent" }} />
                )}
                <Button
                  onClick={() => onCategoryFilterChange("Collectiables")}
                  style={{ textTransform: "none" }}
                >
                  Collectiables
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "70%",
                }}
              >
                <TextField
                  size='small'
                  variant='outlined'
                  label='From'
                  id='outlined-size-normal'
                  defaultValue={priceRange[0]}
                  onChange={(e) =>
                    setpriceRange((prevState) => [e.target.value, prevState[1]])
                  }
                />
                <TextField
                  style={{ marginTop: "0.3rem" }}
                  size='small'
                  variant='outlined'
                  label='To'
                  id='outlined-size-normal'
                  defaultValue={priceRange[1]}
                  onChange={(e) =>
                    setpriceRange((prevState) => [prevState[0], e.target.value])
                  }
                />
                <Select
                  style={{
                    overflow: "hidden",
                  }}
                  size='small'
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={currency}
                  label='currency'
                  onChange={(e) => {
                    onCurrencyChange(e.target.value);
                  }}
                >
                  <MenuItem value={"USD"}>USD</MenuItem>
                  <MenuItem value={"EUR"}>EUR</MenuItem>
                  <MenuItem value={"JPY"}>JPY</MenuItem>
                  <MenuItem value={"ILS"}>ILS</MenuItem>
                </Select>
                <Button
                  style={{
                    textTransform: "none",
                    color: "black",
                    position: "relative",

                    border: "1px solid #f4f4f4",
                  }}
                >
                  Search
                </Button>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={tabValue} index={2}></TabPanel>
          <TabPanel value={tabValue} index={3}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                size='small'
                id='outlined-size-normal'
                defaultValue={search}
                variant='outlined'
                onChange={(e) => setsearch(e.target.value)}
                label={
                  <div className={classes.label}>
                    <SearchIcon />
                  </div>
                }
                style={{
                  width: "85%",
                }}
              />
            </div>
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};

export default SmallScreen;

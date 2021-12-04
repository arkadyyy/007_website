import React from "react";
import "../Dashboard.css";
import { Line, Doughnut, Pie, Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Button,
  Container,
  Box,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";

const DashboardHeader = ({
  onDateRangeChange,
  handleChartTypeChange,
  chartType,
  dateRange,
}) => {
  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div>
          <h2 className='dashboard_header'>Hello David</h2>
        </div>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "2px 0px 20px rgba(75, 55, 55, 0.2)",
            borderRadius: "8px",
            padding: "0.4rem",
          }}
          sx={{ minWidth: 420 }}
        >
          <FormControl style={{ margin: "0 0.3rem" }} fullWidth>
            <InputLabel id='demo-simple-select-label'>Chart Type</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={chartType}
              label='Chart type'
              onChange={handleChartTypeChange}
            >
              <MenuItem value={"products"}>Products</MenuItem>
              <MenuItem value={"tickets"}>Tickets</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box>
              <DesktopDateRangePicker
                startText='Start Date'
                endText='End Date'
                value={dateRange}
                onChange={(newValue) => {
                  onDateRangeChange(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} /> -{" "}
                    {/* <Box sx={{ mx: 2 }}> to </Box> */}
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </Box>
          </LocalizationProvider>
        </Box>
      </Box>
    </>
  );
};

export default DashboardHeader;

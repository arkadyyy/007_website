import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Line, Doughnut, Pie, Bar } from "react-chartjs-2";
import axios from "axios";
import { Container, Box } from "@material-ui/core";

import DashboardHeader from "./Header/Header";

const Dashboard = () => {
  const getDates = (d1, d2) => {
    var oneDay = 24 * 3600 * 1000;
    for (var d = [], ms = d1 * 1, last = d2 * 1; ms < last; ms += oneDay) {
      d.push(new Date(ms).toISOString().split("T")[0]);
    }
    return d;
  };

  const revenueSum = (data) => {
    let returnedArr = [];
    let dates = getDates(dateRange[0], dateRange[1]);
    console.log("DATA ::: ", data);
    dates.forEach((date) => {
      let sameDateData = data.filter(
        (val) =>
          new Date(
            chartType === "products" ? val.purchase_date : val.ticket_date
          )
            .toISOString()
            .split("T")[0] === date
      );

      let sum = sameDateData.reduce((prevVal, nextVal) => {
        return (prevVal +=
          chartType === "products" ? +nextVal.price : +nextVal.ticket_price);
      }, 0);
      returnedArr.push(sum);
    });

    return returnedArr;
  };

  const top5Sold = (data) => {
    let sumArr = [];
    let labels = [];

    data.forEach((item) => {
      if (labels.indexOf(item.product_name) === -1) {
        labels.push(
          chartType === "products" ? item.product_name : item.ticket_type
        );
        let currentLabelData =
          chartType === "products"
            ? data
                .filter((obj) => obj.product_name === item.product_name)
                .map((obj) => obj.price)
                .reduce((curVal, nextVal) => {
                  return (curVal += +nextVal);
                }, 0)
            : data
                .filter((obj) => obj.ticket_type === item.ticket_type)
                .map((obj) => obj.ticket_price)
                .reduce((curVal, nextVal) => {
                  return (curVal += +nextVal);
                }, 0);

        sumArr.push(currentLabelData);
      }
    });

    return { sumArr, labels };
  };

  const top5Countries = (data) => {
    let sumCountry = [];
    let countryLabel = [];

    data.forEach((item) => {
      if (chartType === "products") {
        if (countryLabel.indexOf(item.country) === -1) {
          countryLabel.push(item.country);
          let currentLabelData = data
            .filter((obj) => obj.country === item.country)
            .reduce((curVal, nextVal) => {
              return curVal + 1;
            }, 0);

          sumCountry.push(currentLabelData);
        }
      } else {
        if (countryLabel.indexOf(`${item.visitor_amount}`) === -1) {
          countryLabel.push(item.visitor_amount + " visitors");
          let currentLabelData = data
            .filter((obj) => obj.visitor_amount === item.visitor_amount)
            .reduce((curVal, nextVal) => {
              return curVal + 1;
            }, 0);

          sumCountry.push(currentLabelData);
        }
      }
    });
    console.log({ sumCountry, countryLabel });
    return { sumCountry, countryLabel };
  };

  const today = new Date();
  const [chartType, setchartType] = React.useState("products");
  const [dateRange, setDateRange] = React.useState([
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
    today,
  ]);
  const [revenueData, setRevenueData] = useState([]);
  const [ticketRevenueData, setTicketRevenueData] = useState([]);

  const [data, setdata] = useState({
    labels: getDates(dateRange[0], dateRange[1]),
    datasets: [
      {
        label: `${chartType} Revenues `,
        // data: revenueSum(),
        data: revenueSum(revenueData),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  });

  const [doughntData, setdoughntData] = useState({
    labels: [],
    datasets: [
      {
        label: `Top 5 Sold ${chartType} `,
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [pieData, setpieData] = useState({
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const handleChartTypeChange = (event) => {
    setchartType(event.target.value);
  };

  const onDateRangeChange = (newValue) => {
    setDateRange(newValue);
  };

  //gets all data product & tickets
  useEffect(() => {
    axios
      .get(
        `http://localhost:8888/dashboard/${chartType}/?startDate=${dateRange[0]}&endDate=${dateRange[1]}`
      )
      .then((res) => {
        console.log("res.data :::", res.data);

        // setRevenueData(res.data);

        setdata({
          labels: getDates(dateRange[0], dateRange[1]),
          datasets: [
            {
              label: `${chartType} Revenues `,

              data: revenueSum(res.data),
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
        });

        const { sumArr, labels } = top5Sold(res.data);

        setdoughntData({
          ...doughntData,
          labels: labels,
          datasets: [{ ...doughntData.datasets[0], data: sumArr }],
        });
        const { sumCountry, countryLabel } = top5Countries(res.data);
        setpieData({
          ...pieData,
          labels: countryLabel,
          datasets: [
            {
              ...doughntData.datasets[0],
              data: sumCountry,
            },
          ],
        });
      });
  }, [dateRange, chartType]);

  //sets pie & doughnut data
  // useEffect(() => {

  // }, [revenueData]);

  return (
    <>
      <Container>
        <DashboardHeader
          dateRange={dateRange}
          chartType={chartType}
          onDateRangeChange={onDateRangeChange}
          handleChartTypeChange={handleChartTypeChange}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h4 style={{ fontWeight: "lighter", marginLeft: "1rem" }}>
            {chartType} Revenues
          </h4>
          <Box className='dashboard_line_card'>
            <Line options={{ maintainAspectRatio: false }} data={data} />
          </Box>
          <div style={{ display: "flex", overflow: "hidden" }}>
            <Box style={{ flex: 2 }}>
              <h4 style={{ fontWeight: "lighter", marginLeft: "1rem" }}>
                top 5 sold {chartType}
              </h4>
              <Box className='dashboard_doughtnut_card'>
                <Doughnut
                  style={{ width: "300px", height: "100px" }}
                  data={doughntData}
                  options={{ maintainAspectRatio: false }}
                />
              </Box>
            </Box>

            <Box style={{ flex: 1 }}>
              <h4 style={{ fontWeight: "lighter", marginLeft: "1rem" }}>
                top 5 sold {chartType} by country
              </h4>
              <Box className='dashboard_doughtnut_country_card'>
                <Pie
                  style={{ width: "400px", height: "100px" }}
                  data={pieData}
                  options={{ maintainAspectRatio: false }}
                />
              </Box>
            </Box>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;

import { Container, Box, Link, Grid, Button } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};
const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 31.60861,
  lng: 34.523258,
};

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

const Footer = withRouter(({ history }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyANvsDW5XIJQmzkKO0Q0tHx3hQlv-iXJBs",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <>
      <footer
        style={{
          backgroundColor: "#222322",
          zIndex: 222222,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "300px",
        }}
      >
        <Box style={{ flex: 1, padding: "2rem" }}>
          <Container maxWidth='lg'>
            <Grid container spacing={5} direction='column'>
              <Button
                style={{ color: "white" }}
                onClick={() => history.push("/")}
              >
                Home
              </Button>
              <Button
                style={{ color: "white" }}
                onClick={() => history.push("/ticket")}
              >
                Tickets
              </Button>
              <Button
                style={{ color: "white" }}
                onClick={() => history.push("/cars")}
              >
                The Cars
              </Button>
              <Button
                style={{ color: "white" }}
                onClick={() => history.push("/merch")}
              >
                Store
              </Button>
            </Grid>
          </Container>
        </Box>
        <Box
          style={{
            flex: 3,
            backgroundColor: "lightblue",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              options={options}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {/* Child components, such as markers, info windows, etc. */}
              <></>
            </GoogleMap>
          )}
        </Box>
      </footer>
    </>
  );
});

export default Footer;

import React, { useEffect, useState } from "react";
import axios from "axios";
import blackLogo from "../../../iamges/007_logo_black.png";
import "./AdminLogin.css";
import { Box } from "@mui/system";
import { Container, TextField, Button } from "@material-ui/core";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { withRouter } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const AdminLogin = withRouter(({ history }) => {
  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);
  const [displayError, setdisplayError] = useState(false);

  useEffect(() => {
    console.log("i am here ");
    console.log(displayError);
    setTimeout(() => {
      setdisplayError(false);
    }, 4700);
  }, [displayError]);

  const onLogIn = (username, password) => {
    console.log(displayError);
    axios
      .post(
        "http://localhost:8888/log_in",
        { email: username, password },
        { withCredentials: true, "Content-Type": "application/json" }
      )
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          history.push("/admin");
        }
      })
      .catch((err) => {
        setdisplayError(true);
      });
  };
  return (
    <>
      <div className='loginpage'>
        <div className='logo'>
          <img src={blackLogo}></img>
        </div>
        <Snackbar
          open={displayError}
          autoHideDuration={6000}
          // onClose={handleClose}
        >
          <Alert
            // onClose={handleClose}
            severity='error'
            sx={{ width: "100%", backgroundColor: "#222322" }}
          >
            Invalid Username or Password
          </Alert>
        </Snackbar>
        <h2 className='header'>Admin Log In</h2>
        <Container
          style={{
            border: "1px solid #C4C4C4",
            marginTop: "7%",
            width: "70%",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "55%",
              padding: "4rem",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              onLogIn(username, password);
              setusername(null);
              setpassword(null);
            }}
          >
            <TextField
              value={username}
              onChange={(e) => setusername(e.target.value)}
              label='Username'
            />
            <TextField
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type='password'
              label='Password'
            />
            <Button
              type='submit'
              style={{
                textTransform: "none",
                width: "80px",
                height: "30px",
                border: "1px solid #C4C4C4",
                position: "relative",
                top: "40px",
                left: "190%",
              }}
            >
              Log In{" "}
            </Button>
          </form>
        </Container>
        <div className='admin_triangle'></div>
      </div>
    </>
  );
});

export default AdminLogin;

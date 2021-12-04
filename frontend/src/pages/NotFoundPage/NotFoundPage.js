import Navbar from "../../components/Navbar/NavBar";
import bond_looking_out from "../../iamges/bond_looking_out.png";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
const NotFoundPage = withRouter(({ history }) => {
  return (
    <>
      <Navbar NotFoundPage={true} />
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: " 0px 6rem",
            marginTop: "9rem",
          }}
        >
          <h1
            style={{
              color: "#F4F4F4",
              fontSize: "250px",
              marginBlockStart: "0px",
              marginBlockEnd: "0px",
              fontStyle: "italic",
            }}
          >
            404
          </h1>
          <h1
            style={{
              marginBlockStart: "-30px",
              marginBlockEnd: "1em",
              fontSize: "60px",
              fontStyle: "italic",
              textAlign: "left",
            }}
          >
            Page Not Found
          </h1>

          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <Button
              className='button'
              style={{
                textTransform: "none",
                color: "white",

                width: "33%",
                border: "1px solid #232020",
                color: "#232020",
              }}
              onClick={() => history.goBack()}
            >
              Back
            </Button>
            <Button
              className='button'
              style={{
                textTransform: "none",
                color: "white",

                marginLeft: "2rem",
                border: "1px solid #232020",
                color: "#232020",
                width: "33%",
              }}
              onClick={() => history.push("/")}
            >
              Home
            </Button>
          </div>
        </div>
        <div>
          <div
            style={{
              backgroundColor: "#c4c4c4",
              height: "70vh",
              width: "20vw",
              position: "relative",
              top: "13rem",
            }}
          >
            <img
              style={{
                position: "relative",
                height: "240px",
                width: "500px",
                top: "54%",
                right: "200px",
                overflow: "hidden",
              }}
              src={bond_looking_out}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
});

export default NotFoundPage;

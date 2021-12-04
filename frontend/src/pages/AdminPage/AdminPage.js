import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";

import Box from "@mui/material/Box";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../../iamges/007_logo_black.png";
import ProductManagment from "./ProductManagment/ProductManagment";
import Dashboard from "./Dashboard/Dashboard";
import TicketManagment from "./TicketManagment/TicketManagment";
import { Redirect } from "react-router-dom";

const drawerWidth = 240;

const AdminPage = withRouter(({ history, window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openedPage, setopenedPage] = useState("Dashboard");

  const drawer = (
    <div>
      <Toolbar
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <img src={logo}></img>
        <Typography style={{ fontStyle: "italic", fontWeight: "700" }}>
          Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {["Dashboard", "Product Managment", "Ticket Managment", "Messages"].map(
          (text, index) => (
            <ListItem onClick={() => setopenedPage(text)} button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        <ListItem button key={"Log Out"}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
              Cookies.remove("jwt");
              history.push("/");
            }}
            primary={"Log Out"}
          />
        </ListItem>
      </List>
    </div>
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      {Cookies.get("jwt") ? (
        <>
          <Box style={{ display: "flex" }}>
            <Box
              component='nav'
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label='mailbox folders'
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
                container={container}
                variant='temporary'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                variant='permanent'
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>
            {openedPage === "Dashboard" && <Dashboard />}
            {openedPage === "Product Managment" && <ProductManagment />}
            {openedPage === "Ticket Managment" && <TicketManagment />}
            {openedPage === "Messages" && <h2>Messages</h2>}
          </Box>
        </>
      ) : (
        <>
          <Redirect to='/admin_login' />
        </>
      )}
    </>
  );
});

export default AdminPage;

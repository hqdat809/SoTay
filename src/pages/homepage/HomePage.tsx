import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../containers/SideBar";
import { doSignOut } from "../../firebase/auth";
import * as RoutePaths from "../../routes/paths";
import "./HomePage.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";

const HomePage = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    doSignOut();
    window.location.href = RoutePaths.SIGNIN;
  };

  if (localStorage.getItem("currentUser") == null) {
    handleLogout();
  } else {
    return (
      <div className="HomePage">
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Sidebar />
        </Drawer>
        <div className="HomePage__sidebar">
          <Sidebar />
        </div>
        <div className="HomePage__outlet">
          <div className="HomePage__outlet-nav">
            <div className="Nav-icon">
              <MenuIcon onClick={toggleDrawer(true)} />
            </div>
          </div>
          <div className="HomePage__outlet-content">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
};

export default HomePage;

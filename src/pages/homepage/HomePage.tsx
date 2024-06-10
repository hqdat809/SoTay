import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, Menu, MenuItem } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Notification from "../../components/notification/Notification";
import Sidebar from "../../containers/SideBar";
import { EAuthToken, INotification } from "../../interfaces/user-interfaces";
import * as RoutePaths from "../../routes/paths";
import { getNotificationAction } from "../../stores/actions/notification-actions";
import { TRootState } from "../../stores/reducers";
import { toastInfo } from "../../utils/notifications-utils";
import "./HomePage.scss";
import { doSignOut } from "../../firebase/auth";

const HomePage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: TRootState) => state.authUser.userData);
  const notifications: INotification[] = [];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [anchorElNoti, setAnchorElNoti] = useState<null | HTMLElement>(null);
  const openNotification = Boolean(anchorElNoti);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseNotification = () => {
    setAnchorElNoti(null);
  };

  const handleFeatureNotAvailable = () => {
    toastInfo("Tính năng sẽ được cập nhật trong tương lai!!");
    handleClose();
  };

  const handleClickNotificationIcon = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setAnchorElNoti(event.currentTarget);
  };

  const handleClickUser = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem(EAuthToken.ACCESS_TOKEN);
    localStorage.removeItem(EAuthToken.REFRESH_TOKEN);
    localStorage.removeItem("persist:root");
    handleClose();
    doSignOut();
    window.location.href = RoutePaths.SIGNIN;
  };

  return (
    <div className="HomePage">
      <div className="HomePage__sidebar">
        <Sidebar />
      </div>
      <div className="HomePage__outlet">
        <div className="HomePage__outlet-actions">
          <div style={{ display: "flex", gap: "8px" }}>
            <div
              className="HomePage__outlet-user"
              onClick={(e) => handleClickUser(e)}
            >
              <Avatar
                alt="hqdat"
                src="/src/assets/img/avatar.png"
                sx={{ width: "32px", height: "32px" }}
              />
              <div className="HomePage__outlet-user-name">
                {userData?.firstName} {userData?.lastName}
                <KeyboardArrowDownRoundedIcon />
              </div>
            </div>
            <Notification
              anchorEl={anchorElNoti}
              handleClose={handleCloseNotification}
              notifications={notifications}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              style={{ right: "28px" }}
            >
              <MenuItem
                onClick={handleFeatureNotAvailable}
                className="Navbar__menu-item"
              >
                <PersonOutlineOutlinedIcon /> <span>Tài khoản</span>
              </MenuItem>
              <MenuItem
                onClick={handleFeatureNotAvailable}
                className="Navbar__menu-item"
              >
                <SettingsIcon /> <span>Cài đặt</span>
              </MenuItem>
              <MenuItem onClick={handleLogout} className="Navbar__menu-item">
                <LogoutIcon />
                <span>Đăng xuất</span>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="HomePage__outlet-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import CategoryIcon from "@mui/icons-material/Category";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth";
import * as RoutePaths from "../routes/paths";
import * as routePath from "../routes/paths";
import { TRootState } from "../stores/reducers";
import "./SideBar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state: TRootState) => state.authUser.userData);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    doSignOut();
    window.location.href = RoutePaths.SIGNIN;
  };

  const adminTabs = [
    {
      label: (
        <div
          className={`Sidebar__item-wrapper ${
            location.pathname === routePath.USER && "Sidebar__item-active"
          }`}
        >
          <PersonIcon /> Quản lý người dùng
        </div>
      ),
      route: routePath.USER,
    },
    {
      label: (
        <div
          className={`Sidebar__item-wrapper ${
            location.pathname === routePath.CATEGORY && "Sidebar__item-active"
          }`}
        >
          <CategoryIcon /> Quản lý câu hỏi
        </div>
      ),
      route: routePath.CATEGORY,
    },
  ];

  const renderSidebarItem = (
    data: { label: JSX.Element; route: string },
    key: number
  ) => {
    const { label, route } = data;

    return (
      <div
        key={key}
        onClick={() => navigate(route, { replace: true })}
        className="Sidebar__item"
      >
        {label}
      </div>
    );
  };
  return (
    <div className="Sidebar">
      <div className="Sidebar__user">
        <div className="Sidebar__avt">
          <Avatar
            alt="hqdat"
            src="/src/assets/img/avatar.png"
            sx={{ width: "64px", height: "64px" }}
          />
        </div>
        <div className="Sidebar__name">
          {userData?.firstName} {userData?.lastName}
        </div>
        <div className="Sidebar__role">Quản Trị Viên</div>
      </div>
      <div className="divider"></div>
      {adminTabs.map((tab, key) => renderSidebarItem(tab, key))}
      <div onClick={handleLogout} className="Sidebar__item">
        <div className={`Sidebar__item-wrapper`}>
          <LogoutIcon />
          Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

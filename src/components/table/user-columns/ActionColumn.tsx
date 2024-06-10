import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  EUserModalType,
  IUserDetail,
  TChangePasswordRequest,
  TUpdateUserRequest,
} from "../../../interfaces/user-interfaces";
import UserModal from "../../../pages/user/modal/UserModal";
import { getCategory } from "../../../stores/actions/category-actions";
import {
  changePasswordUserAction,
  getUsersAction,
  updateUserAction,
} from "../../../stores/actions/user-actions";

interface IActionColumnProps {
  userDetail: IUserDetail;
}

const ActionColumn = ({ userDetail }: IActionColumnProps) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [userModalType, setUserModalType] = useState<EUserModalType>(
    EUserModalType.UPDATE_USER
  );
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGetCategory = () => {
    dispatch(getCategory());
  };

  const handleCloseModal = () => {
    setIsOpenUpdateModal(false);
  };

  const handleGetUsers = () => {
    dispatch(getUsersAction());
  };

  const handleUpdateUser = (values: TUpdateUserRequest) => {
    console.log(values);
    dispatch(updateUserAction(values, handleGetUsers));
  };

  const handleChangePassword = (values: TChangePasswordRequest) => {
    dispatch(changePasswordUserAction(values));
  };

  return (
    <div className="EquipmentCard__menu">
      <MoreVertIcon onClick={(e) => handleClick(e)} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setIsOpenUpdateModal(true);
            setUserModalType(EUserModalType.UPDATE_USER);
          }}
        >
          Gia hạn
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setIsOpenUpdateModal(true);
            setUserModalType(EUserModalType.CHANGE_PASSWORD);
          }}
        >
          Đổi mật khẩu
        </MenuItem>
      </Menu>
      <UserModal
        isOpenModal={isOpenUpdateModal}
        handleCloseModal={handleCloseModal}
        onChangePassword={handleChangePassword}
        UserModalType={userModalType}
        selectedUser={userDetail}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
};

export default ActionColumn;

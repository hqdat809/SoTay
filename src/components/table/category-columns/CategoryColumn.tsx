import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ICategory } from "../../../interfaces/category-interface";
import { EUserModalType } from "../../../interfaces/user-interfaces";
import CategoryModal from "../../../pages/category/Modal/CategoryModal";
import {
  getCategory,
  updateCategoryAction,
} from "../../../stores/actions/category-actions";
import { getUsersAction } from "../../../stores/actions/user-actions";

interface IActionColumnProps {
  categoryDetail: ICategory;
}

const CategoryColumn = ({ categoryDetail }: IActionColumnProps) => {
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

  const handleUpdateCategory = (values: ICategory) => {
    dispatch(updateCategoryAction(values, handleGetCategory));
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
          }}
        >
          Chỉnh sửa
        </MenuItem>
      </Menu>
      <CategoryModal
        isUpdateModal
        categoryData={categoryDetail}
        isOpenModal={isOpenUpdateModal}
        onCloseModal={handleCloseModal}
        onUpdateCategory={handleUpdateCategory}
      />
    </div>
  );
};

export default CategoryColumn;

import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table, { userColumn } from "../../components/table/Table";
import {
  EUserModalType,
  IUserDetail,
  TCreateUserRequest,
  TUpdateUserRequest,
} from "../../interfaces/user-interfaces";
import {
  createUserAction,
  deleteUserAction,
  getUsersAction,
  transferEquipmentAction,
  updateUserAction,
} from "../../stores/actions/user-actions";
import { EUserActions } from "../../stores/actions/user-actions/constants";
import { TRootState } from "../../stores/reducers";
import "./UserPage.scss";
import UserModal from "./modal/UserModal";
import ConfirmModal from "../../components/modal/ConfirmModal";
import { auth } from "../../firebase/firebaseConfig";

const UserPage = () => {
  const dispatch = useDispatch();
  const userData: IUserDetail[] = useSelector(
    (state: TRootState) => state.user.users
  );
  const isLoading: boolean = useSelector(
    (state: TRootState) =>
      state.loading[EUserActions.GET_USERS] ||
      state.loading[EUserActions.UPDATE_USER]
  );
  const [selectedUser, setSelectedUser] = useState<IUserDetail[]>([]);
  const [UserModalType, setUserModalType] = useState<EUserModalType>();
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCloseModal = () => {
    setIsOpenCreateModal(false);
    setIsOpenUpdateModal(false);
  };

  const handleGetUsers = () => {
    dispatch(getUsersAction());
  };

  const handleCreateUser = (values: TCreateUserRequest) => {
    dispatch(createUserAction(values, handleGetUsers));
  };

  const handleUpdateUser = (values: TUpdateUserRequest) => {
    console.log(values);
    dispatch(updateUserAction(values, handleGetUsers));
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <div className="UserPage">
      <div className="UserPage__actions">
        <div style={{ display: "flex", gap: "5px" }}>
          <Button
            variant="contained"
            onClick={() => {
              setIsOpenCreateModal(true);
              setUserModalType(EUserModalType.CREATE_USER);
            }}
          >
            Tạo người dùng
          </Button>
        </div>
      </div>
      <div className="UserPage__table">
        <Table
          columns={userColumn}
          rows={userData}
          setSelection={setSelectedUser}
          isLoading={isLoading}
          notCheckBoxSelection
        />
      </div>
      <UserModal
        isOpenModal={isOpenCreateModal || isOpenUpdateModal}
        handleCloseModal={handleCloseModal}
        UserModalType={UserModalType}
        selectedUser={selectedUser[0]}
        onCreateUser={handleCreateUser}
        onUpdateUser={handleUpdateUser}
      />
      {/* <ConfirmModal
        isOpen={isDeleting}
        title="Do you want delete these students?"
        onConfirm={handleDeleteUser}
        onCancel={() => setIsDeleting(false)}
      /> */}
    </div>
  );
};

export default UserPage;

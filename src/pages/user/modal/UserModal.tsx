import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/modal/Modal";
import {
  EUserModalType,
  IUserDetail,
  TChangePasswordRequest,
  TCreateUserRequest,
  TUpdateUserRequest,
} from "../../../interfaces/user-interfaces";
import "./UserModal.scss";
import { MenuItem } from "@mui/material";
import { passFilterLogic } from "@mui/x-data-grid/internals";

interface IUserModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  onCreateUser?: (values: TCreateUserRequest) => void;
  onChangePassword?: (values: TChangePasswordRequest) => void;
  onUpdateUser?: (values: TUpdateUserRequest) => void;
  UserModalType?: EUserModalType;
  selectedUser?: IUserDetail;
}

const UserModal = ({
  isOpenModal,
  handleCloseModal,
  onCreateUser,
  onUpdateUser,
  onChangePassword,
  UserModalType,
  selectedUser,
}: IUserModalProps) => {
  const handleSubmit = (
    values: TCreateUserRequest | TUpdateUserRequest | TChangePasswordRequest,
    actions: any
  ) => {
    if (UserModalType === EUserModalType.CREATE_USER) {
      onCreateUser?.(values as TCreateUserRequest);
    } else if (UserModalType === EUserModalType.UPDATE_USER) {
      onUpdateUser?.(values as TUpdateUserRequest);
    } else if (UserModalType === EUserModalType.CHANGE_PASSWORD) {
      onChangePassword?.(values as TChangePasswordRequest);
    }
    console.log(values);
    handleCloseModal();
    actions.resetForm();
  };

  const convertExpirationDate = (timestamp: number | string) => {
    // Chuyển đổi timestamp thành đối tượng Date
    const date = new Date(timestamp);

    // Định dạng Date thành "YYYY-MM-DD"
    return date.toISOString().split("T")[0];
  };

  const renderButtonSubmit = (formikProps: FormikProps<any>) => {
    switch (UserModalType) {
      case EUserModalType.CREATE_USER:
        return (
          <Button
            type="submit"
            variant="contained"
            disabled={!formikProps.dirty || !formikProps.isValid}
          >
            Tạo người dùng
          </Button>
        );
      case EUserModalType.UPDATE_USER:
        return (
          <Button
            type="submit"
            variant="contained"
            disabled={!formikProps.dirty || !formikProps.isValid}
          >
            Gia hạn
          </Button>
        );
      case EUserModalType.CHANGE_PASSWORD:
        return (
          <Button
            type="submit"
            variant="contained"
            disabled={!formikProps.dirty || !formikProps.isValid}
          >
            Đổi mật khẩu
          </Button>
        );
      default:
        return null;
    }
  };

  const initValuesFormik = () => {
    switch (UserModalType) {
      case EUserModalType.CREATE_USER:
        return {
          email: "",
          password: "",
          expiration: new Date(),
        };
      case EUserModalType.UPDATE_USER:
        return {
          id: selectedUser?.id,
          expiration: convertExpirationDate(
            selectedUser?.accessExpiration || 0
          ),
        };
      case EUserModalType.CHANGE_PASSWORD:
        return {
          id: selectedUser?.id,
          password: "",
        };
      default:
        return {
          email: "",
          password: "",
          expiration: new Date(),
        };
    }
  };

  const returnValidationSchema = () => {
    switch (UserModalType) {
      case EUserModalType.CREATE_USER:
        return Yup.object().shape({
          email: Yup.string()
            .email("Invalid email!")
            .required("Email is required"),
          password: Yup.string().required("Password is required"),
          expiration: Yup.date().required("Expiration date is required"),
        });
      case EUserModalType.UPDATE_USER:
        return Yup.object().shape({
          id: Yup.string(),
          expiration: Yup.string().required("Expiration date is required"),
        });
      case EUserModalType.CHANGE_PASSWORD:
        return Yup.object().shape({
          id: Yup.string(),
          password: Yup.string().required("Password is required"),
        });
      default:
        return null;
    }
  };

  return (
    <Modal
      open={isOpenModal}
      handleCloseModal={handleCloseModal}
      title={
        UserModalType === EUserModalType.CREATE_USER
          ? "Tạo người dùng mới"
          : "Chỉnh sửa thông tin người dùng"
      }
    >
      <div className="UserModal__form">
        <Formik
          initialValues={initValuesFormik()}
          validationSchema={returnValidationSchema()}
          onSubmit={handleSubmit}
        >
          {(formikProps) => {
            return (
              <Form onChange={() => console.log(formikProps.errors)}>
                <div className="UserModal__form-field-row">
                  {UserModalType === EUserModalType.CREATE_USER && (
                    <div className="UserModal__form-field">
                      <TextField
                        variant="outlined"
                        size="small"
                        label="Email"
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        value={formikProps.values.email}
                        type="email"
                        name="email"
                        className={`form-control ${
                          formikProps.errors.email &&
                          formikProps.touched.email &&
                          "UserModal__form-error"
                        }`}
                        placeholder="Nhập địa chỉ email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="UserModal__form-error-text"
                      />
                    </div>
                  )}
                </div>

                {(UserModalType === EUserModalType.CREATE_USER ||
                  UserModalType === EUserModalType.CHANGE_PASSWORD) && (
                  <div className="UserModal__form-field">
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Mật khẩu mới"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.password}
                      type="password"
                      name="password"
                      className={`form-control ${
                        formikProps.errors.password &&
                        formikProps.touched.password &&
                        "UserModal__form-error"
                      }`}
                      placeholder="Nhập mật khẩu mới"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="UserModal__form-error-text"
                    />
                  </div>
                )}

                {(UserModalType === EUserModalType.CREATE_USER ||
                  UserModalType === EUserModalType.UPDATE_USER) && (
                  <div className="UserModal__form-field">
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Ngày hết hạn"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.expiration}
                      type="date"
                      name="expiration"
                      className={`form-control ${
                        formikProps.errors.expiration &&
                        formikProps.touched.expiration &&
                        "UserModal__form-error"
                      }`}
                      placeholder="Nhập ngày hết hạn"
                    />
                    <ErrorMessage
                      name="expiration"
                      component="div"
                      className="UserModal__form-error-text"
                    />
                  </div>
                )}

                <div className="UserModal__form-action">
                  {renderButtonSubmit(formikProps)}
                  {/* {UserModalType === EUserModalType.CREATE_USER ? (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!formikProps.dirty || !formikProps.isValid}
                    >
                      Tạo người dùng
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!formikProps.dirty || !formikProps.isValid}
                    >
                      Gia hạn
                    </Button>
                  )} */}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};

export default UserModal;

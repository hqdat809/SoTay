import React from "react";
import Modal from "../../../components/modal/Modal";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import { Button, TextField } from "@mui/material";
import "./CategoryModal.scss";
import { ICategory } from "../../../interfaces/category-interface";

interface ICategoryModalProps {
  isOpenModal: boolean;
  isUpdateModal?: boolean;
  categoryData?: ICategory;
  onCloseModal: () => void;
  onUpdateCategory?: (values: ICategory) => void;
  onCreateCategory?: (values: ICategory) => void;
}

const CategoryModal = ({
  isOpenModal,
  isUpdateModal,
  onCloseModal,
  categoryData,
  onCreateCategory,
  onUpdateCategory,
}: ICategoryModalProps) => {
  const validationSchema = Yup.object().shape({
    id: Yup.string().required("Name's category is require!!"),
    text: Yup.string().required("Name's category is require!!"),
    answer: Yup.string(),
    content: Yup.boolean(),
  });

  const handleSubmit = (values: ICategory) => {
    if (values.answer) {
      values.content = true;
    }

    if (isUpdateModal) {
      console.log("updated values: ", values);
      onUpdateCategory?.(values);
    } else {
      onCreateCategory?.(values);
    }
    onCloseModal();
  };

  return (
    <Modal
      open={isOpenModal}
      title={isUpdateModal ? "Chỉnh sửa câu hỏi" : "Tạo câu hỏi"}
      handleCloseModal={onCloseModal}
    >
      <div className="CategoryModal__form">
        <Formik
          initialValues={
            isUpdateModal
              ? {
                  id: categoryData?.id || "",
                  text: categoryData?.text || "",
                  answer: categoryData?.answer || "",
                  content: categoryData?.content || false,
                }
              : { id: "", text: "", answer: "", content: false }
          }
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => {
            return (
              <Form>
                <div className="CategoryModal__form-field">
                  <TextField
                    variant="outlined"
                    label="Mục"
                    size="small"
                    type="text"
                    name="id"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    value={formikProps.values.id}
                    className={`form-control ${
                      formikProps.errors.id &&
                      formikProps.touched.id &&
                      "CategoryModal__form-error"
                    }`}
                    placeholder="Nhập đề mục cho câu hỏi. VD: 3.5"
                  />
                  <ErrorMessage
                    name="id"
                    component="div"
                    className="CategoryModal__form-error-text"
                  />
                </div>

                <div className="CategoryModal__form-field">
                  <TextField
                    variant="outlined"
                    label="Câu hỏi"
                    size="small"
                    type="text"
                    name="text"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    value={formikProps.values.text}
                    className={`form-control ${
                      formikProps.errors.text &&
                      formikProps.touched.text &&
                      "CategoryModal__form-error"
                    }`}
                    placeholder="Nhập câu hỏi"
                  />
                  <ErrorMessage
                    name="text"
                    component="div"
                    className="CategoryModal__form-error-text"
                  />
                </div>

                <div className="CategoryModal__form-field">
                  <TextField
                    variant="outlined"
                    label="Câu trả lời"
                    size="small"
                    type="textarea"
                    rows={4}
                    multiline
                    name="answer"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    value={formikProps.values.answer}
                    className={`form-control ${
                      formikProps.errors.answer &&
                      formikProps.touched.answer &&
                      "CategoryModal__form-error"
                    }`}
                    placeholder="Nhập câu trả lời"
                  />
                  <ErrorMessage
                    name="answer"
                    component="div"
                    className="CategoryModal__form-error-text"
                  />
                </div>
                <div className="CategoryModal__form-action">
                  {isUpdateModal ? (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!formikProps.dirty || !formikProps.isValid}
                    >
                      Chỉnh sửa
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!formikProps.dirty || !formikProps.isValid}
                    >
                      Tạo câu hỏi
                    </Button>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};

export default CategoryModal;

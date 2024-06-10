import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryAction,
  deleteCategoryAction,
  getCategory,
} from "../../stores/actions/category-actions";
import { TRootState } from "../../stores/reducers";
import Table, { categoryColumn } from "../../components/table/Table";
import { ICategory } from "../../interfaces/category-interface";
import { ECategoryActions } from "../../stores/actions/category-actions/constants";
import "./CategoryPage.scss";
import { Button } from "@mui/material";
import CategoryModal from "./Modal/CategoryModal";
import ConfirmModal from "../../components/modal/ConfirmModal";
import { deleteCategory } from "../../services/category-services";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: TRootState) => state.categoryReducer.categories
  );
  const [selectedCategory, setSelectedCategory] = useState<ICategory[]>([]);
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isLoadingCategory = useSelector(
    (state: TRootState) => state.loading[ECategoryActions.GET_CATEGORY]
  );

  const handleGetCategory = () => {
    dispatch(getCategory());
  };

  const handleCreateCategory = (values: ICategory) => {
    dispatch(createCategoryAction(values, handleGetCategory));
    console.log(values);
  };

  const handleClickDeleteCategory = () => {
    setIsDeleting(true);
  };

  const handleDeleteCategory = () => {
    const selectedCategoryIds = selectedCategory.map((category) => category.id);
    console.log(selectedCategoryIds);
    dispatch(deleteCategoryAction(selectedCategoryIds, handleGetCategory));
  };

  useEffect(() => {
    handleGetCategory();
  }, []);

  return (
    <div className="CategoryPage">
      <div className="CategoryPage__actions">
        <Button
          variant="contained"
          onClick={() => setIsOpenCategoryModal(true)}
        >
          Tạo câu hỏi
        </Button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Button
            variant="contained"
            color="error"
            disabled={!selectedCategory?.length}
            onClick={handleClickDeleteCategory}
          >
            Xóa câu hỏi
          </Button>
        </div>
      </div>
      <div className="CategoryPage__table">
        <Table
          columns={categoryColumn}
          rows={categories}
          setSelection={setSelectedCategory}
          isLoading={isLoadingCategory}
        />
      </div>

      <CategoryModal
        isOpenModal={isOpenCategoryModal}
        onCloseModal={() => setIsOpenCategoryModal(false)}
        onCreateCategory={handleCreateCategory}
      />
      <ConfirmModal
        isOpen={isDeleting}
        title="Bạn có muốn xóa câu hỏi này không?"
        onConfirm={handleDeleteCategory}
        onCancel={() => setIsDeleting(false)}
      />
    </div>
  );
};

export default CategoryPage;

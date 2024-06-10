import { ICategory } from "../../../interfaces/category-interface";
import { ECategoryActions } from "./constants";

export type TGetCategoryAction = {
  type: ECategoryActions.GET_CATEGORY;
};

export type TCreateCategoryAction = {
  payload: ICategory;
  type: ECategoryActions.CREATE_CATEGORY;
  cb?: () => void;
};

export type TUpdateCategoryAction = {
  type: ECategoryActions.UPDATE_CATEGORY;
  payload: ICategory;
  cb?: () => void;
};

export type TDeleteCategoryAction = {
  type: ECategoryActions.DELETE_CATEGORY;
  payload: string[];
  cb?: () => void;
};

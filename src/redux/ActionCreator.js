import * as ActionTypes from "./ActionTypes";

export const addTask = (task) => ({
  type: ActionTypes.ADD_TASK,
  payload: task,
});

export const removeTask = (id) => ({
  type: ActionTypes.REMOVE_TASK,
  payload: id,
});

export const addCategory = (category) => ({
  type: ActionTypes.ADD_CATEGORY,
  payload: category,
});

export const addCategoryTask = (category) => ({
  type: ActionTypes.ADD_CATEGORY_TASK,
  payload: category,
});

export const removeCategoryTask = ({ categoryName, id }) => ({
  type: ActionTypes.REMOVE_CATEGORY_TASK,
  payload: { categoryName, id },
});

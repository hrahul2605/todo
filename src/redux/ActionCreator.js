import * as ActionTypes from "./ActionTypes";

export const addTask = (task) => ({
  type: ActionTypes.ADD_TASK,
  payload: task,
});

export const removeTask = (id) => ({
  type: ActionTypes.REMOVE_TASK,
  payload: id,
});

export const editTask = ({ id, task }) => ({
  type: ActionTypes.EDIT_TASK,
  payload: { id, task },
});

export const addCategory = (category) => ({
  type: ActionTypes.ADD_CATEGORY,
  payload: category,
});

export const removeCategory = (id) => ({
  type: ActionTypes.REMOVE_CATEGORY,
  payload: id,
});

export const editCategory = (category) => ({
  type: ActionTypes.EDIT_CATEGORY,
  payload: category,
});

export const addCategoryTask = (category) => ({
  type: ActionTypes.ADD_CATEGORY_TASK,
  payload: category,
});

export const removeCategoryTask = ({ categoryId, id }) => ({
  type: ActionTypes.REMOVE_CATEGORY_TASK,
  payload: { categoryId, id },
});

export const editCategroyTask = ({ categoryId, task }) => ({
  type: ActionTypes.EDIT_CATEGORY_TASK,
  payload: { categoryId, task },
});

export const addDoneCategoryTask = ({ categoryId, taskId }) => ({
  type: ActionTypes.ADD_DONE_CATEGORY_TASK,
  payload: { categoryId, taskId },
});

export const removeDoneCategoryTask = ({ categoryId, id }) => ({
  type: ActionTypes.REMOVE_DONE_CATEGORY_TASK,
  payload: { categoryId, id },
});

export const addDoneTask = (doneTask) => ({
  type: ActionTypes.ADD_DONE_TASK,
  payload: doneTask,
});

export const removeDoneTask = (id) => ({
  type: ActionTypes.REMOVE_DONE_TASK,
  payload: id,
});

export const updateDetails = ({ userName, userDesc }) => ({
  type: ActionTypes.UPDATE_DETAILS,
  payload: { userName, userDesc },
});

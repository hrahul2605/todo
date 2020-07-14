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

export const removeCategory = (id) => ({
  type: ActionTypes.REMOVE_CATEGORY,
  payload: id,
});

export const addCategoryTask = (category) => ({
  type: ActionTypes.ADD_CATEGORY_TASK,
  payload: category,
});

export const removeCategoryTask = ({ categoryName, id }) => ({
  type: ActionTypes.REMOVE_CATEGORY_TASK,
  payload: { categoryName, id },
});

export const addDoneCategoryTask = ({ categoryName, taskId }) => ({
  type: ActionTypes.ADD_DONE_CATEGORY_TASK,
  payload: { categoryName, taskId },
});

export const removeDoneCategoryTask = ({ categoryName, id }) => ({
  type: ActionTypes.REMOVE_DONE_CATEGORY_TASK,
  payload: { categoryName, id },
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

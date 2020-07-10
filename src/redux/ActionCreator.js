import * as ActionTypes from "./ActionTypes";

export const addTask = (task) => ({
  type: ActionTypes.ADD_TASK,
  payload: task,
});


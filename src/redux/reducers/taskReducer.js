import * as ActionTypes from "../ActionTypes";
import {
  addNotification,
  removeNotification,
} from "../../components/NotificationHandler";

const INITIAL_STATE = {
  tasks: [],
};

export const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      if (action.payload.id === "") {
        action.payload.id = JSON.stringify(Date.now());
      }
      if (action.payload.reminder !== undefined) {
        addNotification({ task: action.payload });
      }
      return { ...state, tasks: state.tasks.concat(action.payload) };
    case ActionTypes.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((item) => {
          if (item.id !== action.payload) {
            return item;
          } else {
            if (item.reminder !== undefined) {
              removeNotification({ id: action.payload });
            }
          }
        }),
      };
    case ActionTypes.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          let newTask = { ...item };
          if (item.id === action.payload.id) {
            if (item.reminder !== undefined) {
              removeNotification({ id: item.id });
            }
            newTask = { ...item, ...action.payload.task };
            if (newTask.reminder !== undefined) {
              addNotification({ task: newTask });
            }
          }
          return newTask;
        }),
      };
    default:
      return state;
  }
};

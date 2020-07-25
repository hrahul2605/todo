import * as ActionTypes from "../ActionTypes";
import * as Notifications from "expo-notifications";

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
        const z = action.payload.date + " " + action.payload.reminder + ":00";
        const trigger = new Date(z);
        Notifications.scheduleNotificationAsync({
          content: {
            title: action.payload.title,
            body: "Task Pending.",
          },
          trigger,
          identifier: action.payload.id,
        });
      }
      return { ...state, tasks: state.tasks.concat(action.payload) };
    case ActionTypes.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((item) => {
          if (item.id !== action.payload) {
            return item;
          }
        }),
      };
    case ActionTypes.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          let newTask = { ...item };
          if (item.id === action.payload.id) {
            newTask = { ...item, ...action.payload.task };
          }
          return newTask;
        }),
      };
    default:
      return state;
  }
};

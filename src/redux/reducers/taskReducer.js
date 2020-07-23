import * as ActionTypes from "../ActionTypes";
import PushNotification from "react-native-push-notification";

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
        const remindTime = new Date(z);
        console.log("NOTIFY");
        PushNotification.localNotificationSchedule({
          id: action.payload.id.slice(3, 12),
          showWhen: true,
          autoCancel: true,
          largeIcon: "ic_launcher",
          smallIcon: "ic_notification",
          color: "#282828",
          vibrate: true,
          vibration: 300,
          priority: "high",
          visibility: "private",
          title: action.payload.title,
          message: "You have a task to do now.",
          actions: '["Done"]',
          invokeApp: false,
          date: remindTime,
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

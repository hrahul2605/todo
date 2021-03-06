import * as ActionTypes from "../ActionTypes";
import {
  addNotification,
  removeNotification,
} from "../../components/NotificationHandler";

const INITIAL_STATE = {
  category: [],
};

export const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CATEGORY:
      return { ...state, category: state.category.concat(action.payload) };
    case ActionTypes.REMOVE_CATEGORY:
      return {
        ...state,
        category: state.category.filter((item) => {
          if (item.id !== action.payload) {
            return item;
          }
        }),
      };
    case ActionTypes.EDIT_CATEGORY:
      return {
        ...state,
        category: state.category.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, ...action.payload };
          } else return { ...item };
        }),
      };
    case ActionTypes.ADD_CATEGORY_TASK:
      return {
        ...state,
        category: state.category.map((item) => {
          let newItem;
          if (item.id === action.payload.categoryId) {
            action.payload.task.id = JSON.stringify(Date.now());
            newItem = { ...item, tasks: [...item.tasks, action.payload.task] };
            if (action.payload.task.reminder !== undefined) {
              addNotification({ task: action.payload.task });
            }
          } else newItem = { ...item };
          return newItem;
        }),
      };
    case ActionTypes.REMOVE_CATEGORY_TASK:
      return {
        ...state,
        category: state.category.map((item) => {
          if (item.id === action.payload.categoryId) {
            return {
              ...item,
              tasks: item.tasks.filter((x) => {
                if (x.id !== action.payload.id) {
                  return x;
                } else {
                  if (x.reminder !== undefined) {
                    removeNotification({ id: x.id });
                  }
                }
              }),
            };
          } else return { ...item };
        }),
      };

    case ActionTypes.EDIT_CATEGORY_TASK:
      return {
        ...state,
        category: state.category.map((item) => {
          if (item.id === action.payload.categoryId) {
            return {
              ...item,
              tasks: item.tasks.map((x) => {
                if (x.id === action.payload.task.id) {
                  console.log(x)
                  if (x.reminder !== undefined) {
                    removeNotification({ id: x.id });
                  }
                  let newTask = { ...x, ...action.payload.task };
                  if (newTask.reminder !== undefined) {
                    addNotification({ task: newTask });
                  }
                  return { ...x, ...action.payload.task };
                } else return { ...x };
              }),
            };
          } else return { ...item };
        }),
      };
    case ActionTypes.ADD_DONE_CATEGORY_TASK:
      return {
        ...state,
        category: state.category.map((item) => {
          let newItem;
          if (item.id === action.payload.categoryId) {
            let doneItem = item.tasks.filter(
              (x) => x.id === action.payload.taskId
            );
            newItem = { ...item, done: item.done.concat(doneItem) };
          } else newItem = { ...item };
          return newItem;
        }),
      };
    case ActionTypes.REMOVE_DONE_CATEGORY_TASK:
      return {
        ...state,
        category: state.category.map((item) => {
          if (item.id === action.payload.categoryId) {
            return {
              ...item,
              done: item.done.filter((x) => x.id !== action.payload.id),
            };
          } else return { ...item };
        }),
      };
    default:
      return state;
  }
};

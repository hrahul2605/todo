import * as ActionTypes from "../ActionTypes";

const INITIAL_STATE = {
  tasks: [],
};

export const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      console.log(action.payload.id);
      if (action.payload.id === "") {
        action.payload.id = JSON.stringify(Date.now());
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

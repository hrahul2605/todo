import * as ActionTypes from "../ActionTypes";

const INITIAL_STATE = {
  tasks: [],
};

export const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      action.payload.id = JSON.stringify(state.tasks.length);
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
    default:
      return state;
  }
};

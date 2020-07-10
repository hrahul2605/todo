import * as ActionTypes from "../ActionTypes";

const INITIAL_STATE = {
  tasks: [],
};

export const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      return { ...state, tasks: state.tasks.concat(action.payload) };
    case ActionTypes.REMOVE_TASK:
      return { ...state };
    default:
      return state;
  }
};

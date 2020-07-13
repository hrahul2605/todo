import * as ActionTypes from "../ActionTypes";
const INITIAL_STATE = {
  done: [],
};

export const doneReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DONE_TASK:
      return { ...state, done: state.done.concat(action.payload) };
    case ActionTypes.REMOVE_DONE_TASK:
      return {
        ...state,
        done: state.done.filter((item) => {
          if (item.id !== action.payload) {
            return item;
          }
        }),
      };
    default:
      return state;
  }
};

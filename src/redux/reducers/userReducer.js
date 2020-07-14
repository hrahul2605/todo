import * as ActionTypes from "../ActionTypes";

const INITIAL_STATE = {
  userName: "your name here",
  userDesc: "Go to settings to change it",
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_DETAILS:
      return {
        ...state,
        userName: action.payload.userName,
        userDesc: action.payload.userDesc,
      };
    default:
      return state;
  }
};

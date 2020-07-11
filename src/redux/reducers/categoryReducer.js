import * as ActionTypes from "../ActionTypes";

const INITIAL_STATE = {
  category: [],
};

export const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CATEGORY:
      action.payload.id = JSON.stringify(state.category.length);
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
    case ActionTypes.ADD_CATEGORY_TASK:
      return {
        ...state,
        category: state.category.map((item) => {
          let newItem;
          if (item.categoryName === action.payload.categoryName) {
            action.payload.task.id = JSON.stringify(item.tasks.length);
            newItem = { ...item, tasks: [...item.tasks, action.payload.task] };
          } else newItem = { ...item };
          return newItem;
        }),
      };
    case ActionTypes.REMOVE_CATEGORY_TASK:
      return {
        ...state,
        category: state.category.map((item) => {
          if (item.categoryName === action.payload.categoryName) {
            return {
              ...item,
              tasks: item.tasks.filter((x) => x.id !== action.payload.id),
            };
          } else return { ...item };
        }),
      };
    default:
      return state;
  }
};

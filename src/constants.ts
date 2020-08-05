import { Dimensions, StatusBar } from "react-native";

export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const STATUS_BAR = StatusBar.currentHeight || 24;
export const WINDOW_HEIGHT = Dimensions.get("window").height;
export const BOTTOM_NAVBAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT;
export const month = [
  { month: "January", days: 31 },
  { month: "February", days: 28 }, // TO-DO fix leap year
  { month: "March", days: 31 },
  { month: "April", days: 30 },
  { month: "May", days: 31 },
  { month: "June", days: 30 },
  { month: "July", days: 31 },
  { month: "August", days: 30 },
  { month: "October", days: 31 },
  { month: "November", days: 30 },
  { month: "December", days: 31 },
];

export const Avatar = [
  require("./assets/avatars/1.png"),
  require("./assets/avatars/2.png"),
  require("./assets/avatars/3.png"),
  require("./assets/avatars/4.png"),
  require("./assets/avatars/5.png"),
  require("./assets/avatars/6.png"),
  require("./assets/avatars/7.png"),
  require("./assets/avatars/8.png"),
];

export const getMonth = (mon: string) => {
  const index = month.findIndex(({ month }) => month.slice(0, 3) === mon);
  return JSON.stringify(index + 1);
};

export const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const time = [
  "12 AM",
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
];
const date = new Date();
let today = date.getDay();
let days: Array<Object> = [];
let mon = date.getMonth();
for (let i = date.getDate(); i <= month[mon].days; i++) {
  days.push({ date: i, day: day[today] });
  today = (today + 1) % 7;
}

export { days };

export interface task {
  color?: string;
  title: string;
  date: string;
  desc?: string;
  reminder?: string;
  id: string;
}

export interface Category {
  tasks: task[] | [];
  categoryName: string;
  categoryColor: string;
  categoryDesc?: string;
  id: string;
  done: task[] | [];
}

export type RootStackParamList = {
  Home:
    | undefined
    | {
        handleSnackState?: ({
          message,
          snackColor,
        }: {
          message: string;
          snackColor?: string | undefined;
        }) => void;
      };
  FeedScreen: {
    screen: string;
    handleSnackState?: ({
      message,
      snackColor,
    }: {
      message: string;
      snackColor?: string | undefined;
    }) => void;
  };
  CreateTask:
    | undefined
    | {
        categoryName?: string;
        categoryId?: string;
        editScreen?: boolean;
        task?: task;
        isCategoryTaskEdit?: boolean | undefined;
        handleSnackState?: ({
          message,
          snackColor,
        }: {
          message: string;
          snackColor?: string | undefined;
        }) => void;
      };
  CategoryTask: {
    taskName: string;
    bgColor: string;
    categoryId: string | undefined;
    handleSnackState?: ({
      message,
      snackColor,
    }: {
      message: string;
      snackColor?: string | undefined;
    }) => void;
  };
};

export interface user {
  userName: string;
  userDesc: string;
}

export interface state {
  user: user;
  tasks: { tasks: task[] };
  category: { category: Category[] };
  done: { done: task[] };
}

export const colors = [
  "#E46472",
  "#FF8A65",
  "#F9BE7C",
  "#81C784",
  "#309397",
  // "#6488e4",
  "#64B5F6",
  "#BA68C8",
  "#9575CD",
];

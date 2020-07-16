import { Dimensions, StatusBar } from "react-native";
import Av1 from "./assets/avatars/1.svg";
import Av2 from "./assets/avatars/2.svg";
import Av3 from "./assets/avatars/3.svg";
import Av4 from "./assets/avatars/4.svg";
import Av5 from "./assets/avatars/5.svg";
import Av6 from "./assets/avatars/6.svg";
import Av7 from "./assets/avatars/7.svg";
import Av8 from "./assets/avatars/8.svg";
import Av9 from "./assets/avatars/9.svg";
import Av10 from "./assets/avatars/10.svg";

export const Avatar = [Av1, Av2, Av3, Av4, Av5, Av6, Av7, Av8, Av9, Av10];
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
  startTime?: string;
  endTime?: string;
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
  Home: undefined;
  FeedScreen: { screen: string; screenSub: string };
  CreateTask:
    | undefined
    | {
        categoryName?: string;
        categoryId?: string;
        editScreen?: boolean;
        task?: task;
        isCategoryTaskEdit?: boolean | undefined;
      };
  CategoryTask: {
    taskName: string;
    bgColor: string;
    categoryId: string | undefined;
  };
  Calender: undefined;
  Settings: undefined;
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
  "#F9BE7C",
  "#309397",
  // "#6488e4",
  "#E46472",
  "#BA68C8",
  "#81C784",
  "#FF8A65",
  "#9575CD",
  "#64B5F6",
];

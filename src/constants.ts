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

export type RootStackParamList = {
  Home: undefined;
  FeedScreen: { screen: string; screenSub: string };
  CreateTask: undefined;
  CategoryTask: { taskName: string };
  Calender: undefined;
};


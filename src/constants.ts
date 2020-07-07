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

export const day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

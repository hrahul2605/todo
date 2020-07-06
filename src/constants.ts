import { Dimensions, StatusBar } from "react-native";

export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const STATUS_BAR = StatusBar.currentHeight || 24;
export const WINDOW_HEIGHT = Dimensions.get("window").height;
export const BOTTOM_NAVBAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT;

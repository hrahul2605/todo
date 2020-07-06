import * as React from "react";
import { SafeAreaView, StyleSheet, Platform } from "react-native";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { STATUS_BAR, BOTTOM_NAVBAR_HEIGHT } from "../constants";
import Home from "./Home/Home";

export default function Main() {
  const [loaded, error] = Font.useFonts({
    bold: require("../assets/fonts/Montserrat-Bold.ttf"),
    regular: require("../assets/fonts/Montserrat-Regular.ttf"),
    medium: require("../assets/fonts/Montserrat-Medium.ttf"),
    semiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    light: require("../assets/fonts/Montserrat-Light.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor="#FFCC66" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#343232" }}>
        <Home />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  AndroidSafeAreaView: {
    flex: 1,
    marginTop: Platform.OS === "android" ? STATUS_BAR : 0,
    marginBottom: Platform.OS === "android" ? BOTTOM_NAVBAR_HEIGHT : 0,
  },
});

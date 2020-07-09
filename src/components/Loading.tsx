import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import Logo from "../assets/icons/logo.svg";
import { StatusBar } from "expo-status-bar";

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 75,
        backgroundColor: "#282828",
      }}
    >
      <StatusBar backgroundColor="#282828" />
      <Logo width={180} />
      <LottieView
        source={require("../assets/LoaderLotte/Loader.json")}
        loop
        autoPlay
        style={{ marginTop: 10 }}
      />
    </View>
  );
}

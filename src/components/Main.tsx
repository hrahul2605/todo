import * as React from "react";
import { StyleSheet, Platform} from "react-native";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { STATUS_BAR, BOTTOM_NAVBAR_HEIGHT } from "../constants";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import Home from "./Home/Home";
import FeedScreen from "./FeedScreen";
import CreateTask from "./CreateTask";

const Stack = createStackNavigator();

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
      <SafeAreaProvider
        style={{ flex: 1, marginTop: STATUS_BAR, backgroundColor: "#343232" }}
      >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            headerMode="none"
            screenOptions={{ cardStyle: { backgroundColor: "#343232" } }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="FeedScreen"
              component={FeedScreen}
              options={{
                cardStyleInterpolator:
                  CardStyleInterpolators.forFadeFromBottomAndroid,
              }}
            />
            <Stack.Screen
              name="CreateTask"
              component={CreateTask}
              options={{
                cardStyleInterpolator:
                  CardStyleInterpolators.forFadeFromBottomAndroid,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
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

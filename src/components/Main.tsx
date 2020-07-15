import * as React from "react";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  STATUS_BAR,
  RootStackParamList,
} from "../constants";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import Home from "./Home/Home";
import FeedScreen from "./Home/FeedScreen";
import CreateTask from "./Task/CreateTask";
import CategoryTask from "./Task/CategoryTask";
import Loading from "./Loading";
import Calender from "./Calender/Calender";
import Settings from "./Settings";

const Stack = createStackNavigator<RootStackParamList>();

export default function Main() {
  const [loaded, error] = Font.useFonts({
    bold: require("../assets/fonts/Montserrat-Bold.ttf"),
    regular: require("../assets/fonts/Montserrat-Regular.ttf"),
    medium: require("../assets/fonts/Montserrat-Medium.ttf"),
    semiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    light: require("../assets/fonts/Montserrat-Light.ttf"),
  });
  if (!loaded) {
    return <Loading />;
  } else {
    return (
      <>
        <StatusBar backgroundColor="#FFCC66" />
        <SafeAreaProvider
          style={{ flex: 1, marginTop: STATUS_BAR, backgroundColor: "#282828" }}
        >
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: "transparent" },
                cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
              }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="FeedScreen" component={FeedScreen} />
              <Stack.Screen name="CreateTask" component={CreateTask} />
              <Stack.Screen name="CategoryTask" component={CategoryTask} />
              <Stack.Screen name="Calender" component={Calender} />
              <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </>
    );
  }
}

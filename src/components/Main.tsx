import * as React from "react";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackParamList } from "../constants";
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
import Snackbar from "./Snackbar";
import { State } from "react-native-gesture-handler";
import { Value } from "react-native-reanimated";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);
const Stack = createStackNavigator<RootStackParamList>();

export default function Main() {
  const [loaded, error] = Font.useFonts({
    bold: require("../assets/fonts/Montserrat-Bold.ttf"),
    regular: require("../assets/fonts/Montserrat-Regular.ttf"),
    medium: require("../assets/fonts/Montserrat-Medium.ttf"),
    semiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    light: require("../assets/fonts/Montserrat-Light.ttf"),
  });
  const [snackState, setSnackState] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");
  const [snackColor, setSnackColor] = React.useState("");

  const handleSnackState = ({
    message,
    snackColor,
  }: {
    message: string;
    snackColor?: string;
  }) => {
    setSnackMessage(message);
    setSnackColor(message === "Task Completed" ? "#6488e4" : "#444444");
    setSnackState(true);
    if (snackColor !== undefined) {
      setSnackColor(snackColor);
    }
  };
  return (
    <>
      <StatusBar />
      <SafeAreaProvider style={{ flex: 1, backgroundColor: "#282828" }}>
        <Snackbar
          color={snackColor}
          message={snackMessage}
          initial={
            snackState ? new Value(State.ACTIVE) : new Value(State.UNDETERMINED)
          }
          setSnackState={setSnackState}
        />
        <NavigationContainer>
          {!loaded ? (
            <Loading />
          ) : (
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: "transparent" },
                cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
              }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen
                name="FeedScreen"
                component={FeedScreen}
                initialParams={{ handleSnackState }}
              />
              <Stack.Screen
                name="CreateTask"
                component={CreateTask}
                initialParams={{ handleSnackState }}
              />
              <Stack.Screen
                name="CategoryTask"
                component={CategoryTask}
                initialParams={{ handleSnackState }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

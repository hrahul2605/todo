import React, { FunctionComponent, useRef, useEffect } from "react";
import DatePicker, { getFormatedDate } from "../DatePicker/index.js";
import { View, StyleSheet } from "react-native";
import {
  SCREEN_WIDTH,
  WINDOW_HEIGHT,
  getMonth,
  SCREEN_HEIGHT,
  STATUS_BAR,
} from "../../constants";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

interface Props {
  setDate: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  dateAnimate: boolean;
  setDateAnimate: React.Dispatch<React.SetStateAction<boolean>>;
}

const DatePick: FunctionComponent<Props> = ({
  setDate,
  date,
  dateAnimate,
  setDateAnimate,
}) => {
  const dateChange = (date: Date) => {
    setDate(getFormatedDate(date, "ddd, DD MMM YYYY"));
  };

  useEffect(() => {
    if (dateAnimate) {
      Animated.spring(opacity, {
        toValue: 1,
        mass: 0.5,
        damping: 10,
        stiffness: 100,
        overshootClamping: 1,
        restDisplacementThreshold: 0.001,
        restSpeedThreshold: 0.001,
      }).start();
    } else {
      Animated.spring(opacity, {
        toValue: 0,
        mass: 0.3,
        damping: 10,
        stiffness: 100,
        overshootClamping: 1,
        restDisplacementThreshold: 0.001,
        restSpeedThreshold: 0.001,
      }).start();
    }
  }, [dateAnimate]);

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = opacity.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, 0.7, 1],
  });

  const translateY = opacity.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, SCREEN_HEIGHT, SCREEN_HEIGHT],
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        height: WINDOW_HEIGHT,
        width: SCREEN_WIDTH,
        elevation: 10,
        zIndex: 20,
        alignItems: "center",
        justifyContent: "center",
        top: WINDOW_HEIGHT === SCREEN_HEIGHT
        ? -WINDOW_HEIGHT
        : -SCREEN_HEIGHT + STATUS_BAR,
        opacity,
        transform: [{ scale, translateY }],
      }}
    >
      <View style={{ width: 320, height: 320 }}>
        <View style={{ ...styles.container }}>
          <DatePicker
            options={{
              backgroundColor: "#282828",
              borderColor: "#282828",
              textDefaultColor: "white",
              textHeaderFontSize: 18,
              headerFont: "bold",
              textHeaderColor: "white",
              textSecondaryColor: "rgba(255, 255, 255, 0.75)",
              defaultFont: "bold",
              selectedTextColor: "#f9be7c",
              mainColor: "#888",
              textSecondaryFont: "regular",
              textFontSize: 12,
              textSecondaryFontSize: 12,
            }}
            style={{ borderRadius: 24, position: "absolute", elevation: 24 }}
            mode="calendar"
            selected={
              date.slice(12, 17) +
              "-" +
              getMonth(date.slice(8, 11)) +
              "-" +
              date.slice(5, 8)
            }
            onDateChange={(date) => dateChange(date)}
            current={
              date.slice(12, 17) +
              "-" +
              getMonth(date.slice(8, 11)) +
              "-" +
              date.slice(5, 8)
            }
          />
          <TapGestureHandler onHandlerStateChange={() => setDateAnimate(false)}>
            <Animated.View
              style={{
                width: SCREEN_WIDTH,
                height: WINDOW_HEIGHT,
                zIndex: -1,
                elevation: -1,
                position: "absolute",
              }}
            />
          </TapGestureHandler>
        </View>
      </View>
    </Animated.View>
  );
};

export default DatePick;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    height: 50,
    width: SCREEN_WIDTH,
    justifyContent: "space-evenly",
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  cancelBtn: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    backgroundColor: "#E46472",
    borderRadius: 24,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "semiBold",
  },
  doneBtn: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: "#6488e4",
    width: 120,
  },
});

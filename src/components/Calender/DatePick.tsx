import React, { FunctionComponent } from "react";
import DatePicker, { getToday, getFormatedDate } from "../DatePicker/index.js";
import { View, StyleSheet } from "react-native";
import { SCREEN_WIDTH, WINDOW_HEIGHT } from "../../constants";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

interface Props {
  close: () => void;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

const DatePick: FunctionComponent<Props> = ({ close, setDate }) => {
  const dateChange = (date: Date) => {
    setDate(getFormatedDate(date, "ddd, DD MMM"));
  };
  return (
    <View style={{ ...styles.container }}>
      <DatePicker
        options={{
          backgroundColor: "#282828",
          borderColor: "#282828",
          textDefaultColor: "white",
          textHeaderFontSize: 20,
          headerFont: "bold",
          textHeaderColor: "white",
          textSecondaryColor: "rgba(255, 255, 255, 0.75)",
          defaultFont: "bold",
          selectedTextColor: "#f9be7c",
          mainColor: "#888",
          textSecondaryFont: "regular",
          textFontSize: 16,
          textSecondaryFontSize: 12,
        }}
        style={{ borderRadius: 24, position: "absolute" }}
        mode="calendar"
        selected={getToday()}
        onDateChange={(date) => dateChange(date)}
      />
      <TapGestureHandler onHandlerStateChange={() => close()}>
        <Animated.View
          style={{
            width: SCREEN_WIDTH,
            height: WINDOW_HEIGHT,
            zIndex: -1,
            elevation: -1,
            position: "absolute",
          }}
        ></Animated.View>
      </TapGestureHandler>
    </View>
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

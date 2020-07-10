import React, { FunctionComponent } from "react";
import DatePicker, { getToday } from "../DatePicker/index.js"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../../constants";

const DatePick: FunctionComponent<{ close: () => void }> = ({ close }) => {
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
        style={{ borderRadius: 24 }}
        mode="calendar"
        selected={getToday()}
      />
      <View style={{ ...styles.btnContainer }}>
        <TouchableOpacity
          style={{ ...styles.cancelBtn }}
          onPress={() => close()}
        >
          <Text style={{ ...styles.btnText }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.doneBtn }} onPress={() => close()}>
          <Text style={{ ...styles.btnText }}>Done</Text>
        </TouchableOpacity>
      </View>
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

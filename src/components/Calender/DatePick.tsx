import React, { FunctionComponent } from "react";
import DatePicker, { getToday } from "react-native-modern-datepicker";
import { View } from "react-native";

const DatePick: FunctionComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
          textFontSize:16,
          textSecondaryFontSize:12
        }}
        style={{ borderRadius: 24 }}
        mode="calendar"
        selected={getToday()}
      />
    </View>
  );
};

export default DatePick;

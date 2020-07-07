import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import TaskCard from "../TaskCard";

export default function Attaglance() {
  return (
    <View>
      <View style={{ ...styles.headingContainer }}>
        <Text style={{ ...styles.headingText }}>Atta Glance</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "baseline",
        }}
      >
        <TaskCard isCategory={false} color="#309397" />
        <TaskCard isCategory={true} color="#E46472" />
        <TaskCard isCategory={true} color="#FFCC66" />
        <TaskCard isCategory={true} color="#6488e4" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  headingText: {
    fontFamily: "semiBold",
    fontSize: 18,
    color: "#FFFF",
  },
});

import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import TaskCard from "../Task/TaskCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../constants";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function Attaglance({ navigation }: Props) {
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
        <TaskCard
          name="ChatBot"
          desc="Lorem ipsum"
          color="#6488e4"
          navigation={navigation}
        />
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

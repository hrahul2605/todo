import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, SCREEN_WIDTH, task } from "../../constants";
import PercentageCircle from "../PercentageCircle";

interface Props {
  color: string;
  name: string;
  desc?: string;
  navigation: StackNavigationProp<RootStackParamList>;
  onPressed?: (e: boolean) => void;
  isCategory: boolean;
  tasks?: task[];
  date?: string;
  percentage?: number;
}
const colors = ["#f9be7c", "#309397", "#6488e4", "#E46472"];

function TaskCard({
  color = colors[Math.floor(Math.random() * colors.length)],
  isCategory,
  onPressed,
  name,
  navigation,
  desc,
  tasks,
  date,
  percentage,
}: Props) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPressed !== undefined) {
          onPressed(true);
        }
        navigation.navigate("CategoryTask", {
          taskName: name,
          bgColor: color,
        });
      }}
      disabled={!isCategory}
    >
      <View style={{ ...styles.cardContainer, backgroundColor: color }}>
        <View
          style={{
            marginVertical: 28,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isCategory && percentage !== undefined ? (
            <View style={{ marginBottom: 12 }}>
              <PercentageCircle percentage={percentage} />
            </View>
          ) : null}
          <View style={{ ...styles.cardText }}>
            <Text style={{ ...styles.cardTextHeading }}>{name}</Text>
            {desc !== undefined ? (
              <Text style={{ ...styles.cardTextDesc }}>{desc}</Text>
            ) : null}
            {isCategory ? (
              <Text style={{ ...styles.cardTextDesc }}>
                {tasks?.length} task remaining
              </Text>
            ) : null}
            {date !== undefined ? (
              <Text
                style={{
                  ...styles.cardTextDesc,
                  fontSize: 11,
                  fontFamily: "light",
                  paddingTop: 1,
                }}
              >
                {date}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default TaskCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 0.4 * SCREEN_WIDTH,
    borderRadius: 45,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  percentage: {
    height: 64,
    width: 64,
  },
  cardText: {
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTextHeading: {
    fontSize: 14,
    fontFamily: "regular",
    color: "#FFFF",
    textAlign: "center",
  },
  cardTextDesc: {
    fontSize: 12,
    fontFamily: "light",
    color: "#FFFF",
  },
});

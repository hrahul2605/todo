import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../constants";

interface Props {
  color: string;
  name: string;
  desc?: string;
  navigation: StackNavigationProp<RootStackParamList>;
  onPressed?: (e: boolean) => void;
  isCategory: boolean;
}
const colors = ["#f9be7c", "#309397", "#6488e4", "#E46472"];

function TaskCard({
  color = colors[Math.floor(Math.random() * colors.length)],
  isCategory,
  onPressed,
  name,
  navigation,
  desc,
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
          {isCategory ? <View style={{ ...styles.percentage }}></View> : null}
          <View style={{ ...styles.cardText }}>
            <Text style={{ ...styles.cardTextHeading }}>{name}</Text>
            {desc !== undefined ? (
              <Text style={{ ...styles.cardTextDesc }}>{desc}</Text>
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
    width: 144,
    height: "auto",
    borderRadius: 45,
    marginLeft: 24,
    marginBottom: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  percentage: {
    height: 64,
    width: 64,
    borderRadius: 64,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "white",
  },
  cardText: {
    height: 41,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTextHeading: {
    fontSize: 15,
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

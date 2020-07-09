import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../constants";

interface Props {
  isCategory: boolean;
  color: string;
  name: string;
  desc: string;
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function TaskCard(props: Props) {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("CategoryTask", { taskName: props.name })
      }
    >
      <View style={{ ...styles.cardContainer, backgroundColor: props.color }}>
        <View style={{ marginVertical: 28 }}>
          {props.isCategory ? (
            <View style={{ ...styles.percentage }}></View>
          ) : null}
          <View style={{ ...styles.cardText }}>
            <Text style={{ ...styles.cardTextHeading }}>{props.name}</Text>
            <Text style={{ ...styles.cardTextDesc }}>{props.desc}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

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
    backgroundColor: "white",
    borderRadius: 64,
    marginBottom: 12,
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
  },
  cardTextDesc: {
    fontSize: 12,
    fontFamily: "light",
    color: "#FFFF",
  },
});

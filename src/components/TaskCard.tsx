import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  isCategory: boolean;
  color: string;
}

export default function TaskCard(props: Props) {
  return (
    <View style={{ ...styles.cardContainer, backgroundColor: props.color }}>
      <View style={{ marginVertical: 28 }}>
        {props.isCategory ? (
          <View style={{ ...styles.percentage }}></View>
        ) : null}
        <View style={{ ...styles.cardText }}>
          <Text style={{ ...styles.cardTextHeading }}>ChatBot</Text>
          <Text style={{ ...styles.cardTextDesc }}>Description</Text>
        </View>
      </View>
    </View>
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

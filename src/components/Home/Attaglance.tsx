import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Attaglance() {
  return (
    <View>
      <View style={{ ...styles.headingContainer }}>
        <Text style={{ ...styles.headingText }}>Atta Glance</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ ...styles.cardContainer }}>
            <View style={{ ...styles.percentage }}></View>
            <View style={{ ...styles.cardText }}>
              <Text style={{ ...styles.cardTextHeading }}>ChatBot</Text>
              <Text style={{ ...styles.cardTextDesc }}>Description</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View
            style={{
              ...styles.cardContainer,
              height: 116,
              backgroundColor: "#f9be7c",
            }}
          >
            <Text style={{ ...styles.cardTextHeading }}>Todo App</Text>
            <Text style={{ ...styles.cardTextDesc }}>Description</Text>
          </View>
        </View>
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
  cardContainer: {
    width: 144,
    height: 180,
    backgroundColor: "#309397",
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

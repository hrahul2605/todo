import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Left from "../assets/icons/left.svg";
import Plus from "../assets/icons/plus.svg";
import { STATUS_BAR } from "../constants";

interface Props {
  screen: String;
}

export default function FeedScreen(props: Props) {
  return (
    <View style={{ ...styles.container }}>
      <View style={{ ...styles.nav }}>
        <Left color="white" />
        <Plus color="white" />
      </View>
      <View style={{ ...styles.headingContainer }}>
        <Text style={{ ...styles.headingText }}>{props.screen}</Text>
      </View>
      <View>
        <Text style={{ ...styles.headingMotivate }}>Giddy-up Captain!</Text>
      </View>
      <View style={{ height: "auto", paddingVertical: 12 }}>
        <View
          style={{
            ...styles.taskContainer,
            backgroundColor: "#6488e4",
          }}
        >
          <Text style={{ ...styles.taskTitle }}>Chocholate cake</Text>
          <Text style={{ ...styles.taskDesc }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ...
          </Text>
        </View>
        <View
          style={{
            ...styles.taskContainer,
            backgroundColor: "#E46472",
          }}
        >
          <Text style={{ ...styles.taskTitle }}>Chocholate cake</Text>
          <Text style={{ ...styles.taskDesc }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ...
          </Text>
        </View>
        <View
          style={{
            ...styles.taskContainer,
            backgroundColor: "#f9be7c",
          }}
        >
          <Text style={{ ...styles.taskTitle }}>Chocholate cake</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: STATUS_BAR,
    marginHorizontal: 24,
  },
  nav: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingContainer: {
    height: 56,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  headingText: {
    fontFamily: "bold",
    fontSize: 22,
    color: "#FFFF",
  },
  headingMotivate: {
    color: "rgba(255, 255, 255, 0.75)",
    fontFamily: "medium",
    fontSize: 14,
  },
  taskContainer: {
    height: "auto",
    width: 312,
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
  },
  taskTitle: {
    fontFamily: "medium",
    fontSize: 14,
    color: "#FFFF",
  },
  taskDesc: {
    fontFamily: "light",
    fontSize: 12,
    color: "#FFFF",
  },
});

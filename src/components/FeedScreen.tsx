import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Left from "../assets/icons/left.svg";
import Plus from "../assets/icons/plus.svg";
import TaskCard from "./TaskCard";

export default function FeedScreen(props: any) {
  return (
    <View style={{ ...styles.container }}>
      <View style={{ ...styles.nav }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Left color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("CreateTask")}
        >
          <Plus color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.headingContainer }}>
        <Text style={{ ...styles.headingText }}>
          {props.route.params.screen}
        </Text>
      </View>
      <View style={{ marginHorizontal: 24, marginBottom: 3 }}>
        <Text style={{ ...styles.headingMotivate }}>
          {props.route.params.screenSub}
        </Text>
      </View>
      <View style={{ height: "auto", paddingVertical: 12 }}>
        {props.route.params.screen !== "In progress" ? (
          <>
            <View
              style={{
                ...styles.taskContainer,
                backgroundColor: "#6488e4",
                marginHorizontal: 24,
              }}
            >
              <Text style={{ ...styles.taskTitle }}>Chocholate cake</Text>
              <Text style={{ ...styles.taskDesc }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit ...
              </Text>
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "baseline",
              }}
            >
              <TaskCard color="#6488e4" isCategory={true} />
              <TaskCard color="#f9be7c" isCategory={true} />
              <TaskCard color="#E46472" isCategory={true} />
              <TaskCard color="#309397" isCategory={true} />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
  },
  headingContainer: {
    height: 56,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
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

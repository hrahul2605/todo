import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Left from "../../assets/icons/left.svg";
import Plus from "../../assets/icons/plus.svg";
import TaskCard from "../Task/TaskCard";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../constants";
import { connect } from "react-redux";

interface task {
  category?: string;
  title: string;
  date: string;
  desc?: string;
  startTime?: string;
  endTime?: string;
}
interface Props {
  route: RouteProp<RootStackParamList, "FeedScreen">;
  navigation: StackNavigationProp<RootStackParamList, "FeedScreen">;
  tasks: Array<task>;
}

const mapStateToProps = (state: { tasks: { tasks: task } }) => ({
  tasks: state.tasks.tasks,
});
const FeedScreen: React.FunctionComponent<Props> = ({
  route,
  navigation,
  tasks,
}) => {
  console.log(tasks);
  return (
    <View style={{ ...styles.container }}>
      <View style={{ ...styles.nav }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Left color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CreateTask")}>
          <Plus color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.headingContainer }}>
        <Text style={{ ...styles.headingText }}>{route.params.screen}</Text>
      </View>
      <View style={{ marginHorizontal: 24, marginBottom: 3 }}>
        <Text style={{ ...styles.headingMotivate }}>
          {route.params.screenSub}
        </Text>
      </View>
      <View style={{ height: "auto", paddingVertical: 12 }}>
        {route.params.screen !== "In progress" ? (
          <>
            {tasks.map((item, index) => (
              <View
                style={{
                  ...styles.taskContainer,
                  backgroundColor: "#6488e4",
                  marginHorizontal: 24,
                }}
                key={index}
              >
                <Text style={{ ...styles.taskTitle }}>{item.title}</Text>
                <Text style={{ ...styles.taskDesc }}>
                  {item.date} {item.desc}
                </Text>
              </View>
            ))}
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
              <TaskCard
                name="ChatBot"
                desc="Lorem ipsum"
                color="#6488e4"
                isCategory={true}
                navigation={navigation}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default connect(mapStateToProps)(FeedScreen);

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

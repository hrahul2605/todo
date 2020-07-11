import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Left from "../../assets/icons/left.svg";
import Plus from "../../assets/icons/plus.svg";
import TaskCard from "../Task/TaskCard";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootStackParamList,
  task,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from "../../constants";
import { connect } from "react-redux";

import { removeTask } from "../../redux/ActionCreator";
import TaskItem from "../Task/TaskItem";

interface Category {
  tasks: task[];
  categoryName: string;
  categoryColor: string;
  categoryDesc?: string;
  id: string;
}

interface Props {
  route: RouteProp<RootStackParamList, "FeedScreen">;
  navigation: StackNavigationProp<RootStackParamList, "FeedScreen">;
  tasks: Array<task>;
  removeTask: (id: string) => void;
  category: Category[];
}

const mapStateToProps = (state: {
  tasks: { tasks: Array<task> };
  category: { category: Category[] };
}) => ({
  tasks: state.tasks.tasks,
  category: state.category.category,
});

const mapDispatchToProps = (dispatch: any) => ({
  removeTask: (id: string) => dispatch(removeTask(id)),
});

const FeedScreen: React.FunctionComponent<Props> = ({
  route,
  navigation,
  tasks,
  removeTask,
  category,
}) => {
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
            <FlatList
              data={tasks}
              renderItem={({ item, index }) => (
                <TaskItem key={index} task={item} removeTask={removeTask} />
              )}
              keyExtractor={(item) => item.id}
            />
          </>
        ) : (
          <View
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              paddingBottom: 170,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FlatList
              data={category}
              renderItem={({ item }) => (
                <TaskCard
                  name={item.categoryName}
                  desc={item.categoryDesc}
                  color={item.categoryColor}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={{
                width: SCREEN_WIDTH,
                justifyContent: "center",
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);

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
});

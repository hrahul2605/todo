import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
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

import {
  removeTask,
  addDoneTask,
  removeDoneTask,
} from "../../redux/ActionCreator";
import TaskItem from "../Task/TaskItem";
import List from "../List";

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
  addDoneTask: (doneTask: task) => void;
  done: Array<task>;
  removeDoneTask: (id: string) => void;
}

const mapStateToProps = (state: {
  tasks: { tasks: Array<task> };
  category: { category: Category[] };
  done: { done: Array<task> };
}) => ({
  tasks: state.tasks.tasks,
  category: state.category.category,
  done: state.done.done,
});

const mapDispatchToProps = (dispatch: any) => ({
  removeTask: (id: string) => dispatch(removeTask(id)),
  addDoneTask: (doneTask: task) => dispatch(addDoneTask(doneTask)),
  removeDoneTask: (id: string) => dispatch(removeDoneTask(id)),
});

const FeedScreen: React.FunctionComponent<Props> = ({
  route,
  navigation,
  tasks,
  removeTask,
  category,
  addDoneTask,
  done,
  removeDoneTask,
}) => {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const [pressed, setPressed] = React.useState(false);
  const animate = (val: number) => {
    Animated.spring(opacity, {
      toValue: val,
      mass: 1,
      stiffness: 500,
      damping: 60,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      animate(1);
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      if (!pressed) {
        animate(0);
      } else {
        animate(2);
        setPressed(false);
      }
    });
    return unsubscribe;
  }, [pressed]);

  const translateX = opacity.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, -SCREEN_WIDTH, -SCREEN_WIDTH * 2],
  });

  return (
    <Animated.View
      style={{
        ...styles.container,
        left: SCREEN_WIDTH,
        transform: [{ translateX }],
        opacity,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          elevation: 0.1,
          zIndex: 20,
          backgroundColor: "#282828",
          width: "100%",
        }}
      >
        <View style={{ ...styles.nav }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Left color="white" />
          </TouchableOpacity>
          {route.params.screen !== "Done" ? (
            <TouchableOpacity
              onPress={() => {
                setPressed(true);
                navigation.navigate("CreateTask");
              }}
            >
              <Plus color="white" />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={{ ...styles.headingContainer }}>
          <Text style={{ ...styles.headingText }}>{route.params.screen}</Text>
        </View>
        <View style={{ marginHorizontal: 24, marginBottom: 3 }}>
          <Text style={{ ...styles.headingMotivate }}>
            {route.params.screenSub}
          </Text>
        </View>
      </View>
      <View style={{ height: "auto", paddingVertical: 12 }}>
        {route.params.screen !== "In progress" ? (
          route.params.screen === "To do" ? (
            <>
              <FlatList
                data={tasks}
                renderItem={({ item, index }) => (
                  <TaskItem
                    key={index}
                    task={item}
                    removeTask={removeTask}
                    addDoneTask={addDoneTask}
                  />
                )}
                contentContainerStyle={{ paddingTop: 139, paddingBottom: 30 }}
                numColumns={1}
                style={{ height: SCREEN_HEIGHT, zIndex: 10 }}
              />
            </>
          ) : (
            <>
              <FlatList
                data={done}
                renderItem={({ item, index }) => (
                  <TaskItem
                    key={index}
                    task={item}
                    removeTask={removeTask}
                    doneScreen={true}
                    removeDoneTask={removeDoneTask}
                    color="#6488e4"
                  />
                )}
                contentContainerStyle={{ paddingTop: 139, paddingBottom: 30 }}
                numColumns={1}
                style={{ height: SCREEN_HEIGHT, zIndex: 10 }}
              />
            </>
          )
        ) : (
          <View
            style={{
              height: SCREEN_HEIGHT,
              width: SCREEN_WIDTH,
              paddingTop: 139,
              flexDirection: "row",
            }}
          >
            <List
              setPressed={setPressed}
              navigation={navigation}
              data={category}
              isProgressScreen={true}
            />
          </View>
        )}
      </View>
    </Animated.View>
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

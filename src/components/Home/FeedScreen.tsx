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
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootStackParamList,
  task,
  SCREEN_WIDTH,
  Category,
  state,
  WINDOW_HEIGHT,
} from "../../constants";
import { connect } from "react-redux";
import {
  removeTask,
  addDoneTask,
  removeDoneTask,
} from "../../redux/ActionCreator";
import TaskItem from "../Task/TaskItem";
import List from "../List";
import { setStatusBarStyle } from "expo-status-bar";

interface Props {
  route: RouteProp<RootStackParamList, "FeedScreen">;
  navigation: StackNavigationProp<RootStackParamList, "FeedScreen">;
  tasks: Array<task>;
  removeTask: (id: string) => void;
  addDoneTask: (doneTask: task) => void;
  removeDoneTask: (id: string) => void;
  category: Category[];
  done: Array<task>;
}

const mapStateToProps = (state: state) => ({
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

  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setStatusBarStyle("light");
      animate(1);
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (route.params.screen !== "Group") {
      timer = setTimeout(() => setLoaded(true), 1000);
    }
    return () => clearTimeout(timer);
  }, []);

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

  const handleEdit = ({ task }: { task: task }) => {
    setPressed(true);
    navigation.navigate("CreateTask", {
      editScreen: true,
      task,
    });
  };

  tasks.sort((a, b) => {
    return Date.parse(a.date) - Date.parse(b.date);
  });

  return (
    <>
      <Animated.View
        style={{
          ...styles.container,
          left: SCREEN_WIDTH,
          transform: [{ translateX }],
          opacity,
        }}
      >
        <View style={{ ...styles.header }}>
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
          {route.params.screen !== "Group" ? (
            route.params.screen === "Task" ? (
              <>
                <FlatList
                  data={tasks}
                  renderItem={({ item, index }) => (
                    <TaskItem
                      key={index}
                      task={item}
                      removeTask={removeTask}
                      addDoneTask={addDoneTask}
                      x={700 + index * 450}
                      loaded={loaded}
                      color={item.color}
                      handleEdit={handleEdit}
                      handleSnackState={route.params.handleSnackState}
                    />
                  )}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingTop: 139, paddingBottom: 50 }}
                  numColumns={1}
                  style={{ height: WINDOW_HEIGHT, zIndex: 10 }}
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
                      x={700 + index * 450}
                      loaded={loaded}
                      handleSnackState={route.params.handleSnackState}
                    />
                  )}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingTop: 139, paddingBottom: 50 }}
                  numColumns={1}
                  style={{ height: WINDOW_HEIGHT, zIndex: 10 }}
                />
              </>
            )
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={undefined}
              renderItem={undefined}
              style={{ height: WINDOW_HEIGHT }}
              ListEmptyComponent={
                <>
                  <View
                    style={{
                      paddingTop: 139,
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    <List
                      setPressed={setPressed}
                      navigation={navigation}
                      data={category}
                      isProgressScreen={true}
                    />
                  </View>
                </>
              }
              contentContainerStyle={{ paddingBottom: 50 }}
            />
          )}
        </View>
      </Animated.View>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
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
  header: {
    position: "absolute",
    top: 0,
    elevation: 0.1,
    zIndex: 20,
    backgroundColor: "#282828",
    width: "100%",
    paddingTop: 24,
  },
});

import React, { FunctionComponent, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
} from "react-native";
import Left from "../../assets/icons/left.svg";
import Plus from "../../assets/icons/plus.svg";
import Delete from "../../assets/icons/delete.svg";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, SCREEN_WIDTH, Category } from "../../constants";
import {
  removeTask,
  removeCategoryTask,
  removeCategory,
  addDoneCategoryTask,
  removeDoneCategoryTask,
} from "../../redux/ActionCreator";
import { connect } from "react-redux";
import TaskItem from "./TaskItem";

interface det {
  categoryId: string | undefined;
  id: string;
}

interface Props {
  route: RouteProp<RootStackParamList, "CategoryTask">;
  navigation: StackNavigationProp<RootStackParamList, "CategoryTask">;
  removeTask: (id: string) => void;
  removeCategoryTask: (det: det) => void;
  category: Category[];
  removeCategory: (id: string) => void;
  addDoneCategoryTask: ({
    categoryId,
    taskId,
  }: {
    categoryId: string;
    taskId: string;
  }) => void;
  removeDoneCategoryTask: (det: det) => void;
}

const mapStateToProps = (state: { category: { category: Category[] } }) => ({
  category: state.category.category,
});

const mapDispatchToProps = (dispatch: any) => ({
  removeTask: (id: string) => dispatch(removeTask(id)),
  removeCategoryTask: (det: det) => dispatch(removeCategoryTask(det)),
  removeCategory: (id: string) => dispatch(removeCategory(id)),
  addDoneCategoryTask: ({
    categoryId,
    taskId,
  }: {
    categoryId: string;
    taskId: string;
  }) => dispatch(addDoneCategoryTask({ categoryId, taskId })),
  removeDoneCategoryTask: (det: det) => dispatch(removeDoneCategoryTask(det)),
});

const CategoryTask: FunctionComponent<Props> = ({
  navigation,
  route,
  removeTask,
  removeCategoryTask,
  category,
  removeCategory,
  addDoneCategoryTask,
  removeDoneCategoryTask,
}) => {
  const index = category.findIndex((item) => {
    return item.id === route.params.categoryId;
  });
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

  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    let timer = setTimeout(() => setLoaded(true), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const translateX = opacity.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, -SCREEN_WIDTH, -SCREEN_WIDTH * 2],
  });

  let taskLength = 0;
  if (category[index] !== undefined) {
    taskLength = category[index].tasks.length;
  }

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity,
        transform: [{ translateX }],
        left: SCREEN_WIDTH,
        paddingTop: 8,
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
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              removeCategory(category[index].id);
            }}
            style={{ marginRight: 25 }}
          >
            <Delete color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPressed(true);
              navigation.navigate("CreateTask", {
                categoryName: route.params.taskName,
                categoryId: route.params.categoryId,
              });
            }}
          >
            <Plus color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ ...styles.headingContainer }}>
        <Text style={{ ...styles.headingText }}>{route.params.taskName}</Text>
      </View>
      <View style={{ ...styles.motivateTextContainer }}>
        <Text style={{ ...styles.motivateText }}>Giddy-up Captain!</Text>
      </View>
      <FlatList
        data={null}
        renderItem={null}
        ListHeaderComponent={
          category[index] !== undefined ? (
            <>
              <View style={{ paddingHorizontal: 36, marginTop: 12 }}>
                <Text
                  style={{ color: "#FFFF", fontFamily: "bold", fontSize: 15 }}
                >
                  To do.
                </Text>
                {category[index].tasks.length === 0 ? (
                  <Text
                    style={{
                      color: "#FFFF",
                      fontFamily: "light",
                      fontSize: 12,
                      marginTop: 10,
                    }}
                  >
                    No tasks added
                  </Text>
                ) : null}
              </View>
              <FlatList
                nestedScrollEnabled={true}
                data={category[index].tasks}
                renderItem={({ item, index }) => {
                  return (
                    <TaskItem
                      key={index}
                      task={item}
                      removeTask={removeTask}
                      removeCategoryTask={removeCategoryTask}
                      categoryName={route.params.taskName}
                      color={route.params.bgColor}
                      addDoneCategoryTask={addDoneCategoryTask}
                      x={700 + index * 450}
                      loaded={loaded}
                      categoryId={route.params.categoryId}
                    />
                  );
                }}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                style={{ ...styles.scrollStyle }}
                contentContainerStyle={{ ...styles.scrollContainer }}
              />
            </>
          ) : null
        }
        ListFooterComponent={
          category[index] !== undefined ? (
            <>
              <View style={{ paddingHorizontal: 36 }}>
                <Text
                  style={{ color: "#FFFF", fontFamily: "bold", fontSize: 15 }}
                >
                  Done
                </Text>
                {category[index].done.length === 0 ? (
                  category[index].tasks.length === 0 ? (
                    <Text
                      style={{
                        color: "#FFFF",
                        fontFamily: "light",
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      Nothing completed
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "#FFFF",
                        fontFamily: "light",
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      You lazy bastard, do some work!
                    </Text>
                  )
                ) : null}
              </View>
              <FlatList
                nestedScrollEnabled={true}
                data={category[index].done}
                renderItem={({ item, index }) => {
                  return (
                    <TaskItem
                      key={index}
                      task={item}
                      categoryName={route.params.taskName}
                      color="#6488e4"
                      addDoneCategoryTask={addDoneCategoryTask}
                      isCategoryDoneScreen={true}
                      removeDoneCategoryTask={removeDoneCategoryTask}
                      x={700 + (index + taskLength) * 450}
                      loaded={loaded}
                      categoryId={route.params.categoryId}
                    />
                  );
                }}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                style={{ ...styles.scrollStyle }}
                contentContainerStyle={{ ...styles.scrollContainer }}
              />
            </>
          ) : null
        }
      />
    </Animated.View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTask);

const styles = StyleSheet.create({
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
  nav: {
    height: 56,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headingContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headingText: {
    color: "#FFFF",
    fontSize: 22,
    fontFamily: "bold",
  },
  motivateTextContainer: {
    height: 24,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 24,
  },
  motivateText: {
    fontSize: 14,
    fontFamily: "medium",
    color: "rgba(255, 255, 255, 0.75)",
  },
  scrollContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  scrollStyle: {
    paddingVertical: 12,
  },
  taskDate: {
    fontFamily: "light",
    fontSize: 12,
    color: "#FFFF",
  },
});

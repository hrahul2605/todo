import React, { FunctionComponent, useEffect } from "react";
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
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, task, SCREEN_WIDTH } from "../../constants";
import { removeTask, removeCategoryTask } from "../../redux/ActionCreator";
import { connect } from "react-redux";
import TaskItem from "./TaskItem";

interface det {
  categoryName: string | undefined;
  id: string;
}

interface Category {
  tasks: task[];
  categoryName: string;
  categoryColor: string;
  categoryDesc?: string;
  id: string;
}
interface Props {
  route: RouteProp<RootStackParamList, "CategoryTask">;
  navigation: StackNavigationProp<RootStackParamList, "CategoryTask">;
  removeTask: (id: string) => void;
  removeCategoryTask: (det: det) => void;
  category: Category[];
}

const mapStateToProps = (state: { category: { category: Category[] } }) => ({
  category: state.category.category,
});

const mapDispatchToProps = (dispatch: any) => ({
  removeTask: (id: string) => dispatch(removeTask(id)),
  removeCategoryTask: (det: det) => dispatch(removeCategoryTask(det)),
});

const CategoryTask: FunctionComponent<Props> = ({
  navigation,
  route,
  removeTask,
  removeCategoryTask,
  category,
}) => {
  const index = category.findIndex((item) => {
    return item.categoryName === route.params.taskName;
  });
  const transition = React.useRef(new Animated.Value(0)).current;

  const animateDown = () => {
    Animated.spring(transition, {
      toValue: 0,
      mass: 1,
      stiffness: 500,
      damping: 60,
      useNativeDriver: true,
    }).start();
  };
  const animateUp = () => {
    Animated.spring(transition, {
      toValue: 1,
      mass: 1,
      stiffness: 500,
      damping: 60,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    navigation.addListener("blur", () => {
      animateDown();
    });

    navigation.addListener("focus", (e) => {
      animateUp();
    });
  }, [navigation]);

  const translateX = transition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -SCREEN_WIDTH],
  });
  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: transition,
        transform: [{ translateX }],
        left: SCREEN_WIDTH,
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
        <TouchableOpacity onPress={() => navigation.navigate("CreateTask")}>
          <Plus color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.headingContainer }}>
        <Text style={{ ...styles.headingText }}>{route.params.taskName}</Text>
      </View>
      <View style={{ ...styles.motivateTextContainer }}>
        <Text style={{ ...styles.motivateText }}>Giddy-up Captain!</Text>
      </View>
      <FlatList
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
            />
          );
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ ...styles.scrollStyle }}
        contentContainerStyle={{ ...styles.scrollContainer }}
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
    height: 56,
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

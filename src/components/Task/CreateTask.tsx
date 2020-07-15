import React, { FunctionComponent, useRef, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import {
  SCREEN_WIDTH,
  RootStackParamList,
  SCREEN_HEIGHT,
  task,
  Category,
  state,
  WINDOW_HEIGHT,
  colors,
} from "../../constants";
import { StackNavigationProp } from "@react-navigation/stack";
import AddCategory from "./AddCategory";
import CreateTaskDesc from "./CreateTaskDesc";
import CreateTaskHeader from "./CreateTaskHeader";
import DatePick from "../Calender/DatePick";
import {
  addTask,
  addCategory,
  addCategoryTask,
} from "../../redux/ActionCreator";
import { connect } from "react-redux";
import { getFormatedDate } from "../DatePicker";
import { StackActions, RouteProp } from "@react-navigation/native";

interface Props {
  route: RouteProp<RootStackParamList, "CreateTask">;
  navigation: StackNavigationProp<RootStackParamList, "CreateTask">;
  addTask: (task: task) => any;
  category: Category[];
  addCategory: (category: Category) => any;
  addCategoryTask: (task: { categoryId: string; task: task }) => any;
}

const mapStateToProps = (state: state) => ({
  category: state.category.category,
});

const mapDispatchToProps = (dispatch: any) => ({
  addTask: (task: task) => dispatch(addTask(task)),
  addCategory: (category: Category) => dispatch(addCategory(category)),
  addCategoryTask: (task: { categoryId: string; task: task }) =>
    dispatch(addCategoryTask(task)),
});

const CreateTask: FunctionComponent<Props> = ({
  navigation,
  addTask,
  category,
  addCategory,
  addCategoryTask,
  route,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const dateAnimate = useRef(new Animated.Value(0)).current;
  const mainViewOpacity = useRef(new Animated.Value(1)).current;

  const animateMainViewUp = () => {
    Animated.timing(mainViewOpacity, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const animateMainViewDown = () => {
    Animated.timing(mainViewOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const btnOpacity = mainViewOpacity.interpolate({
    inputRange: [0.8, 1],
    outputRange: [0, 1],
  });

  const scale = opacity.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0.7, 0.7, 1],
  });

  const translateY = opacity.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, -SCREEN_HEIGHT, -SCREEN_HEIGHT],
  });

  const animateModal = () => {
    animateMainViewUp();
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      mass: 0.5,
    }).start();
  };

  const closeModal = () => {
    animateMainViewDown();
    Animated.spring(opacity, {
      toValue: 0,
      useNativeDriver: true,
      mass: 0.3,
    }).start();
  };

  const animateDateOpen = () => {
    animateMainViewUp();
    Animated.spring(dateAnimate, {
      toValue: 1,
      useNativeDriver: true,
      mass: 0.5,
    }).start();
  };

  const animateDateClose = () => {
    animateMainViewDown();
    Animated.spring(dateAnimate, {
      toValue: 0,
      useNativeDriver: true,
      mass: 0.3,
    }).start();
  };

  const dateScale = dateAnimate.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, 0.7, 1],
  });

  const dateY = dateAnimate.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, SCREEN_HEIGHT, SCREEN_HEIGHT],
  });

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(getFormatedDate(new Date(), "ddd, DD MMM"));
  const [isCat, setCat] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pressedOnce, setPressedOnce] = useState(false);
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (route.params?.categoryId !== undefined) {
      setSelectedCategory(route.params.categoryId);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory === "") {
      setCat(false);
    } else {
      setCat(true);
    }
  }, [selectedCategory]);

  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      Animated.spring(translation, {
        toValue: 1,
        mass: 1,
        stiffness: 500,
        damping: 60,
        useNativeDriver: true,
      }).start();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      Animated.spring(translation, {
        toValue: 0,
        mass: 1,
        stiffness: 500,
        damping: 60,
        useNativeDriver: true,
      }).start();
    });
    return unsubscribe;
  }, [navigation]);

  const transX = translation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -SCREEN_WIDTH],
  });

  return (
    <Animated.View
      style={{
        opacity: translation,
        transform: [{ translateX: transX }],
        left: SCREEN_WIDTH,
        paddingTop: 8,
        height: WINDOW_HEIGHT,
      }}
    >
      <Animated.View
        style={{
          ...styles.datePickerContainer,
          opacity: dateAnimate,
          transform: [{ scale: dateScale, translateY: dateY }],
        }}
      >
        <View style={{ width: 332, height: 332 }}>
          <DatePick close={animateDateClose} setDate={setDate} />
        </View>
      </Animated.View>
      <Animated.View
        style={{
          ...styles.addCategoryContainer,
          opacity,
          transform: [{ scale, translateY }],
        }}
      >
        <AddCategory
          addCategory={addCategory}
          close={closeModal}
          type="Add Category"
          setSelectedCategory={setSelectedCategory}
        />
      </Animated.View>
      <Animated.View
        style={{
          ...styles.headerContainer,
          opacity: mainViewOpacity,
        }}
      >
        <CreateTaskHeader
          goBack={navigation.goBack}
          animateDateOpen={animateDateOpen}
          title={title}
          setTitle={setTitle}
          date={date}
          setDate={setDate}
        />
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: SCREEN_WIDTH, opacity: mainViewOpacity }}
      >
        <CreateTaskDesc
          categories={category}
          animateModal={animateModal}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          desc={desc}
          setDesc={setDesc}
        />
      </Animated.ScrollView>
      <Animated.View
        style={{ opacity: btnOpacity, ...styles.createTaskContainer }}
      >
        <TouchableOpacity
          onPress={() => {
            setPressedOnce(true);
            if (!isCat) {
              if (desc === "") {
                addTask({
                  date: date,
                  title: title,
                  id: "",
                  color: colors[Math.floor(Math.random() * colors.length)],
                });
              } else {
                addTask({
                  date: date,
                  title: title,
                  id: "",
                  desc: desc,
                  color: colors[Math.floor(Math.random() * colors.length)],
                });
              }
            } else {
              if (desc === "") {
                addCategoryTask({
                  categoryId: selectedCategory,
                  task: { date: date, title: title, id: "" },
                });
              } else {
                addCategoryTask({
                  categoryId: selectedCategory,
                  task: { date: date, title: title, id: "", desc: desc },
                });
              }
            }
            navigation.dispatch(StackActions.pop());
            Keyboard.dismiss();
          }}
          disabled={pressedOnce || title === ""}
        >
          <View
            style={{
              flex: 1,
              width: SCREEN_WIDTH - 48,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 45,
            }}
          >
            <Text style={{ ...styles.createTaskText }}>Create Task</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);

const styles = StyleSheet.create({
  addCategoryContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    top: WINDOW_HEIGHT,
    height: WINDOW_HEIGHT,
    elevation: 10,
  },
  headerContainer: {
    height: 323,
    backgroundColor: "#FFCC66",
    borderBottomRightRadius: 45,
    borderBottomLeftRadius: 45,
    position: "absolute",
    elevation: 1,
    zIndex: 1,
    paddingTop: 8,
  },
  createTaskContainer: {
    width: SCREEN_WIDTH - 48,
    height: 48,
    position: "absolute",
    backgroundColor: "#6488e4",
    borderRadius: 45,
    marginHorizontal: 24,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    bottom: 48,
  },
  createTaskText: {
    fontSize: 14,
    color: "#FFFF",
    fontFamily: "bold",
  },
  datePickerContainer: {
    position: "absolute",
    height: WINDOW_HEIGHT,
    width: SCREEN_WIDTH,
    elevation: 10,
    zIndex: 20,
    alignItems: "center",
    justifyContent: "center",
    top: -WINDOW_HEIGHT,
  },
});

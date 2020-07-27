import React, { FunctionComponent, useRef, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Keyboard,
  BackHandler,
} from "react-native";
import {
  SCREEN_WIDTH,
  RootStackParamList,
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
  editTask,
  removeTask,
  editCategroyTask,
  removeCategoryTask,
} from "../../redux/ActionCreator";
import { connect } from "react-redux";
import { getFormatedDate } from "../DatePicker";
import {
  StackActions,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { setStatusBarStyle } from "expo-status-bar";
import TimePick from "../Calender/TimePick";

interface det {
  categoryId: string | undefined;
  id: string;
}

interface Props {
  route: RouteProp<RootStackParamList, "CreateTask">;
  navigation: StackNavigationProp<RootStackParamList, "CreateTask">;
  addTask: (task: task) => any;
  category: Category[];
  addCategory: (category: Category) => any;
  addCategoryTask: (task: { categoryId: string; task: task }) => any;
  editTask: ({ id, task }: { id: string; task: task }) => void;
  removeTask: (id: string) => void;
  editCategroyTask: ({
    categoryId,
    task,
  }: {
    categoryId: string;
    task: task;
  }) => void;
  removeCategoryTask: (det: det) => void;
}

const mapStateToProps = (state: state) => ({
  category: state.category.category,
});

const mapDispatchToProps = (dispatch: any) => ({
  addTask: (task: task) => dispatch(addTask(task)),
  addCategory: (category: Category) => dispatch(addCategory(category)),
  addCategoryTask: (task: { categoryId: string; task: task }) =>
    dispatch(addCategoryTask(task)),
  editTask: ({ id, task }: { id: string; task: task }) =>
    dispatch(editTask({ id, task })),
  removeTask: (id: string) => dispatch(removeTask(id)),
  editCategroyTask: ({
    categoryId,
    task,
  }: {
    categoryId: string;
    task: task;
  }) => dispatch(editCategroyTask({ categoryId, task })),
  removeCategoryTask: (det: det) => dispatch(removeCategoryTask(det)),
});

const CreateTask: FunctionComponent<Props> = ({
  navigation,
  addTask,
  category,
  addCategory,
  addCategoryTask,
  route,
  editTask,
  removeTask,
  editCategroyTask,
  removeCategoryTask,
}) => {
  const [dateAnimate, setDateAnimate] = useState(false);
  const [timeAnimate, setTimeAnimate] = useState(false);
  const mainViewOpacity = useRef(new Animated.Value(1)).current;
  const [editHold, setEditHold] = useState(false);
  const [categoryName, setSelectedCategoryName] = useState("");
  const [categoryColor, setSelectedCategoryColor] = useState("");

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

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (!modal) {
      animateMainViewDown();
    } else {
      animateMainViewUp();
    }
  }, [modal]);
  useEffect(() => {
    if (!dateAnimate) {
      animateMainViewDown();
    } else {
      animateMainViewUp();
    }
  }, [dateAnimate]);
  useEffect(() => {
    if (!timeAnimate) {
      animateMainViewDown();
    } else {
      animateMainViewUp();
    }
  }, [timeAnimate]);
  useEffect(() => {
    if (!editHold) {
      animateMainViewDown();
    } else {
      animateMainViewUp();
    }
  }, [editHold]);

  const [title, setTitle] = useState(
    route.params?.task?.title !== undefined ? route.params.task.title : ""
  );
  const [date, setDate] = useState(
    route.params?.task?.date !== undefined
      ? route.params.task.date
      : getFormatedDate(new Date(), "ddd, DD MMM YYYY")
  );
  const [reminder, setReminder] = useState(
    route.params?.task?.reminder !== undefined
      ? route.params.task.reminder
      : "none"
  );
  const [isCat, setCat] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pressedOnce, setPressedOnce] = useState(false);
  const [desc, setDesc] = useState(
    route.params?.task?.desc !== undefined ? route.params.task.desc : ""
  );

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
      setStatusBarStyle("dark");
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

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (modal) {
          setModal(false);
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [modal])
  );
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (dateAnimate) {
          setDateAnimate(false);
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [dateAnimate])
  );

  const btnTransX = useRef(new Animated.Value(0)).current;
  const btnTranslateX = btnTransX.interpolate({
    inputRange: [0, 0.01, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -2.5, 2.5, -1.5, 1.5, 0],
  });

  const handleButton = () => {
    if (
      Date.now() - 8.64e7 > Date.parse(date) ||
      title === "" ||
      title === "Task Title" ||
      (reminder !== "none" &&
        Date.now() > new Date(date + " " + reminder + ":00").getTime())
    ) {
      Animated.spring(btnTransX, {
        toValue: 1,
        stiffness: 1000,
        useNativeDriver: true,
      }).start(() => btnTransX.setValue(0));
      if (route.params?.handleSnackState !== undefined) {
        route.params?.handleSnackState({
          message:
            title === "" || title === "Task Title"
              ? "Enter title."
              : Date.now() - 8.64e7 > Date.parse(date)
              ? "The date has passed."
              : "The time has passed.",
          snackColor: "#555555",
        });
      }
    } else {
      const taskColor = colors[Math.floor(Math.random() * colors.length)];
      setPressedOnce(true);
      if (
        !isCat &&
        route.params !== undefined &&
        route.params.handleSnackState !== undefined
      ) {
        if (!route.params?.editScreen) {
          addTask({
            date: date,
            title: title,
            id: "",
            desc: desc === "" ? undefined : desc,
            color: taskColor,
            reminder: reminder === "none" ? undefined : reminder,
          });
          route.params?.handleSnackState({
            message: "Task added.",
            snackColor: taskColor,
          });
        } else {
          if (route.params.task !== undefined) {
            if (route.params.isCategoryTaskEdit === undefined) {
              editTask({
                id: route.params.task?.id,
                task: {
                  date: date,
                  title: title,
                  id: route.params.task?.id,
                  color: route.params.task?.color,
                  desc: desc === "" ? undefined : desc,
                  reminder: reminder === "none" ? undefined : reminder,
                },
              });
              route.params.handleSnackState({
                message: "Task Updated",
                snackColor: route.params.task.color,
              });
            } else {
              addTask({
                id: route.params.task.id,
                title: title,
                date: date,
                color: taskColor,
                desc: desc === "" ? undefined : desc,
                reminder: reminder === "none" ? undefined : reminder,
              });
              removeCategoryTask({
                categoryId: route.params.categoryId,
                id: route.params.task.id,
              });
              route.params.handleSnackState({
                message: "Moved to Tasks",
                snackColor: taskColor,
              });
            }
          }
        }
      } else {
        if (
          route.params?.isCategoryTaskEdit === undefined &&
          route.params?.handleSnackState !== undefined
        ) {
          if (!route.params?.editScreen) {
            addCategoryTask({
              categoryId: selectedCategory,
              task: {
                date: date,
                title: title,
                id: "",
                desc: desc === "" ? undefined : desc,
                reminder: reminder === "none" ? undefined : reminder,
              },
            });
            route.params?.handleSnackState({
              message: `Task added in ${categoryName}`,
              snackColor: categoryColor,
            });
          } else {
            if (route.params.task !== undefined) {
              addCategoryTask({
                categoryId: selectedCategory,
                task: {
                  date: date,
                  title: title,
                  id: route.params.task?.id,
                  desc: desc === "" ? undefined : desc,
                  reminder: reminder === "none" ? undefined : reminder,
                },
              });
              removeTask(route.params.task.id);
              route.params?.handleSnackState({
                message: `Task shifted to ${categoryName}`,
                snackColor: categoryColor,
              });
            }
          }
        } else {
          if (
            route.params !== undefined &&
            route.params.task !== undefined &&
            route.params.handleSnackState !== undefined
          ) {
            if (selectedCategory === route.params.categoryId) {
              editCategroyTask({
                categoryId: selectedCategory,
                task: {
                  id: route.params.task?.id,
                  title: title,
                  date: date,
                  desc: desc === "" ? undefined : desc,
                  reminder: reminder === "none" ? undefined : reminder,
                },
              });
              route.params?.handleSnackState({
                message: `Task Updated`,
                snackColor: categoryColor,
              });
            } else {
              addCategoryTask({
                categoryId: selectedCategory,
                task: {
                  date: date,
                  title: title,
                  id: route.params.task.id,
                  desc: desc === "" ? undefined : desc,
                  reminder: reminder === "none" ? undefined : reminder,
                },
              });
              removeCategoryTask({
                categoryId: route.params.categoryId,
                id: route.params.task.id,
              });
              route.params?.handleSnackState({
                message: `Task shifted to ${categoryName}`,
                snackColor: categoryColor,
              });
            }
          }
        }
      }
      navigation.dispatch(StackActions.pop());
      Keyboard.dismiss();
    }
  };

  return (
    <Animated.View
      style={{
        opacity: translation,
        transform: [{ translateX: transX }],
        left: SCREEN_WIDTH,
        paddingTop: 8,
        height: WINDOW_HEIGHT,
        bottom: 0,
      }}
    >
      <DatePick
        dateAnimate={dateAnimate}
        setDateAnimate={setDateAnimate}
        date={date}
        setDate={setDate}
      />
      <TimePick
        dateAnimate={timeAnimate}
        setDateAnimate={setTimeAnimate}
        reminder={reminder}
        setReminder={setReminder}
      />
      <AddCategory
        addCategory={addCategory}
        type="Add Category"
        setSelectedCategory={setSelectedCategory}
        modal={modal}
        setModal={setModal}
        handleSnackState={route.params?.handleSnackState}
      />
      <AddCategory
        editCategoryId={selectedCategory}
        editCategoryName={categoryName}
        editCategoryColor={categoryColor}
        type="Edit Category"
        modal={editHold}
        setModal={setEditHold}
        handleSnackState={route.params?.handleSnackState}
      />
      <Animated.View
        style={{
          ...styles.headerContainer,
          opacity: mainViewOpacity,
        }}
      >
        <CreateTaskHeader
          goBack={navigation.goBack}
          setDateAnimate={setDateAnimate}
          title={title}
          setTitle={setTitle}
          date={date}
          setDate={setDate}
          editScreen={route.params?.editScreen}
          setTimeAnimate={setTimeAnimate}
          reminder={reminder}
        />
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: SCREEN_WIDTH, opacity: mainViewOpacity }}
      >
        <CreateTaskDesc
          categories={category}
          setModal={setModal}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          desc={desc}
          setDesc={setDesc}
          setSelectedCategoryName={setSelectedCategoryName}
          setSelectedCategoryColor={setSelectedCategoryColor}
          setEditHold={setEditHold}
          editHold={editHold}
          modal={modal}
        />
      </Animated.ScrollView>
      <Animated.View
        style={{
          opacity: btnOpacity,
          ...styles.createTaskContainer,
          transform: [{ translateX: btnTranslateX }],
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            width: SCREEN_WIDTH - 48,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 45,
            backgroundColor: "#6488e4",
          }}
          onPress={() => handleButton()}
          disabled={pressedOnce || modal}
        >
          <Text style={{ ...styles.createTaskText }}>
            {route.params?.editScreen ? "Save" : "Create Task"}
          </Text>
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
    height: 347,
    backgroundColor: "#FFCC66",
    borderBottomRightRadius: 45,
    borderBottomLeftRadius: 45,
    position: "absolute",
    elevation: 10,
    zIndex: 1,
    paddingTop: 32,
  },
  createTaskContainer: {
    width: SCREEN_WIDTH - 48,
    height: 48,
    position: "absolute",
    borderRadius: 45,
    marginHorizontal: 24,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    bottom: 24,
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

import React, { FunctionComponent, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  BackHandler,
} from "react-native";
import Left from "../../assets/icons/left.svg";
import Plus from "../../assets/icons/plus.svg";
import Delete from "../../assets/icons/delete.svg";
import Edit from "../../assets/icons/edit.svg";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootStackParamList,
  SCREEN_WIDTH,
  Category,
  task,
} from "../../constants";
import {
  removeTask,
  removeCategoryTask,
  removeCategory,
  addDoneCategoryTask,
  removeDoneCategoryTask,
} from "../../redux/ActionCreator";
import { connect } from "react-redux";
import TaskItem from "./TaskItem";
import AddCategory from "./AddCategory";
import { setStatusBarStyle } from "expo-status-bar";
import DeleteCategory from "../DeleteCategory";
import { Value } from "react-native-reanimated";

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
  const i = category.findIndex((item) => {
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
      setStatusBarStyle("light");
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
  if (category[i] !== undefined) {
    taskLength = category[i].tasks.length;
  }

  const handleCategoryTaskEdit = ({ task }: { task: task }) => {
    setPressed(true);
    navigation.navigate("CreateTask", {
      editScreen: true,
      isCategoryTaskEdit: true,
      categoryId: category[i].id,
      task,
    });
  };

  const [modal, setModal] = useState(false);

  const confirmModalDelete = new Value<0 | 1 | 2>(0);

  const handleCategoryDelete = () => {
    confirmModalDelete.setValue(2);
    setTimeout(() => {
      navigation.goBack();
      if (route.params.handleSnackState !== undefined) {
        route.params.handleSnackState({
          message: `${category[i].categoryName} deleted.`,
          snackColor: category[i].categoryColor,
        });
      }
      removeCategory(category[i].id);
    }, 5);
  };

  const handleDeleteCancel = () => {
    confirmModalDelete.setValue(2);
  };

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

  return (
    <>
      {category[i] !== undefined ? (
        <AddCategory
          editCategoryId={category[i].id}
          editCategoryName={category[i].categoryName}
          editCategoryColor={category[i].categoryColor}
          type="Edit Category"
          modal={modal}
          setModal={setModal}
          handleSnackState={route.params.handleSnackState}
        />
      ) : null}
      <DeleteCategory
        state={confirmModalDelete}
        handleDeleteCancel={handleDeleteCancel}
        handleCategoryDelete={handleCategoryDelete}
        groupName={category[i] !== undefined ? category[i].categoryName : ""}
      />
      <Animated.View
        style={{
          flex: 1,
          opacity,
          transform: [{ translateX }],
          left: SCREEN_WIDTH,
          paddingTop: 24,
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
              onPress={() => setModal(true)}
              style={{ paddingRight: 20 }}
            >
              <Edit color="white" width={17} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => confirmModalDelete.setValue(1)}
              style={{ marginRight: 10, paddingRight: 10 }}
            >
              <Delete color="white" width={17} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPressed(true);
                if (category[i] !== undefined) {
                  navigation.navigate("CreateTask", {
                    categoryName: category[i].categoryName,
                    categoryId: category[i].id,
                  });
                }
              }}
            >
              <Plus color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ ...styles.headingContainer }}>
          {category[i] !== undefined ? (
            <Text style={{ ...styles.headingText }}>
              {category[i].categoryName}
            </Text>
          ) : null}
        </View>
        <View style={{ ...styles.motivateTextContainer }}>
          <Text style={{ ...styles.motivateText }}>Giddy-up Captain!</Text>
        </View>
        <FlatList
          data={null}
          renderItem={null}
          ListHeaderComponent={
            category[i] !== undefined ? (
              <>
                <View style={{ paddingHorizontal: 36, marginTop: 12 }}>
                  <Text
                    style={{ color: "#FFFF", fontFamily: "bold", fontSize: 15 }}
                  >
                    To do.
                  </Text>
                  {category[i].tasks.length === 0 ? (
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
                  data={category[i].tasks}
                  renderItem={({ item, index }) => {
                    return (
                      <TaskItem
                        key={index}
                        task={item}
                        removeTask={removeTask}
                        removeCategoryTask={removeCategoryTask}
                        categoryName={category[i].categoryName}
                        color={category[i].categoryColor}
                        addDoneCategoryTask={addDoneCategoryTask}
                        x={700 + index * 450}
                        loaded={loaded}
                        categoryId={route.params.categoryId}
                        handleCategoryTaskEdit={handleCategoryTaskEdit}
                        handleSnackState={route.params.handleSnackState}
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
            category[i] !== undefined ? (
              <>
                <View style={{ paddingHorizontal: 36 }}>
                  <Text
                    style={{ color: "#FFFF", fontFamily: "bold", fontSize: 15 }}
                  >
                    Done
                  </Text>
                  {category[i].done.length === 0 ? (
                    category[i].tasks.length === 0 ? (
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
                  data={category[i].done}
                  renderItem={({ item, index }) => {
                    return (
                      <TaskItem
                        key={index}
                        task={item}
                        categoryName={category[i].categoryName}
                        color="#444444"
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
    </>
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

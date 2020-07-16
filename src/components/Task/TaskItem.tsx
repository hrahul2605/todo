import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  add,
  cond,
  eq,
  set,
  useCode,
  sub,
} from "react-native-reanimated";
import {
  snapPoint,
  spring,
  usePanGestureHandler,
  useValue,
  min,
} from "react-native-redash";

import { task, SCREEN_WIDTH } from "../../constants";
import Edit from "../../assets/icons/edit.svg";
import Delete from "../../assets/icons/delete.svg";
import Correct from "../../assets/icons/correct.svg";

interface det {
  categoryId: string | undefined;
  id: string;
}
const snapPoints = [-120, 0];

interface ItemProps {
  task: task;
  removeTask?: (id: string) => void;
  removeCategoryTask?: (det: det) => void;
  categoryName?: string;
  color?: string;
  addDoneTask?: (doneTask: task) => void;
  doneScreen?: boolean;
  removeDoneTask?: (id: string) => void;
  addDoneCategoryTask?: ({
    categoryId,
    taskId,
  }: {
    categoryId: string;
    taskId: string;
  }) => void;
  isCategoryDoneScreen?: boolean;
  removeDoneCategoryTask?: (det: det) => void;
  x: number;
  loaded: boolean;
  categoryId?: string;
  handleEdit?: ({ task }: { task: task }) => void;
  handleCategoryTaskEdit?: ({ task }: { task: task }) => void;
}

const TaskItem: React.FunctionComponent<ItemProps> = ({
  task,
  removeTask,
  removeCategoryTask,
  categoryName,
  color = "#E46472",
  addDoneTask,
  doneScreen = false,
  removeDoneTask,
  addDoneCategoryTask,
  isCategoryDoneScreen = false,
  removeDoneCategoryTask,
  x,
  loaded,
  categoryId,
  handleEdit,
  handleCategoryTaskEdit,
}) => {
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const translateX = useValue(0);
  const offsetX = useValue(0);
  const to = snapPoint(translateX, velocity.x, snapPoints);
  const itemTransX = useValue(0);

  const config = { mass: 1, damping: 70, stiffness: 300 };
  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        set(translateX, add(offsetX, min(translation.x, 0)))
      ),
      cond(eq(state, State.END), [
        set(
          translateX,
          spring({
            from: translateX,
            to,
            config: { mass: 1, stiffness: 500, damping: 60 },
          })
        ),
        set(offsetX, translateX),
      ]),
    ],
    []
  );

  useCode(() => [set(itemTransX, spring({ from: 0, to: -x, config }))], []);

  return (
    <Animated.View
      style={{
        left: !loaded ? x : 0,
        transform: [{ translateX: !loaded ? itemTransX : 0 }],
      }}
    >
      <View style={{ ...styles.bg }}>
        <Animated.View
          style={{
            ...styles.btn,
            transform: [{ translateX: sub(translateX, -125) }],
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (removeCategoryTask !== undefined) {
                removeCategoryTask({ categoryId: categoryId, id: task.id });
              } else if (doneScreen === false && removeTask !== undefined) {
                removeTask(task.id);
              } else if (removeDoneTask !== undefined) {
                removeDoneTask(task.id);
              } else if (removeDoneCategoryTask !== undefined) {
                removeDoneCategoryTask({
                  categoryId: categoryId,
                  id: task.id,
                });
              }
            }}
          >
            <Delete color="white" width={16} />
          </TouchableOpacity>
          {!doneScreen && !isCategoryDoneScreen ? (
            <TouchableOpacity
              onPress={() => {
                if (handleEdit !== undefined) {
                  handleEdit({ task: task });
                } else if (handleCategoryTaskEdit !== undefined) {
                  handleCategoryTaskEdit({ task: task });
                }
              }}
            >
              <Edit color="white" width={16} />
            </TouchableOpacity>
          ) : null}
          {!doneScreen && !isCategoryDoneScreen ? (
            <TouchableOpacity
              onPress={() => {
                if (addDoneTask !== undefined && removeTask !== undefined) {
                  addDoneTask(task);
                  removeTask(task.id);
                } else if (
                  addDoneCategoryTask !== undefined &&
                  categoryId !== undefined &&
                  removeCategoryTask !== undefined
                ) {
                  addDoneCategoryTask({
                    categoryId: categoryId,
                    taskId: task.id,
                  });
                  removeCategoryTask({
                    categoryId: categoryId,
                    id: task.id,
                  });
                }
              }}
            >
              <Correct color="white" width={16} />
            </TouchableOpacity>
          ) : null}
        </Animated.View>
      </View>
      <PanGestureHandler {...gestureHandler} activeOffsetX={[-15, 15]}>
        <Animated.View style={{ transform: [{ translateX }], elevation: 10 }}>
          <View
            style={{
              ...styles.taskContainer,
              backgroundColor: color,
              marginHorizontal: 24,
            }}
          >
            <Text style={{ ...styles.taskTitle }}>{task.title}</Text>
            {task.desc !== undefined ? (
              <Text style={{ ...styles.taskDesc, paddingBottom: 4 }}>
                {task.desc}
              </Text>
            ) : null}
            <Text style={{ ...styles.taskDesc, fontSize: 10 }}>
              {task.date.slice(0, 11)}
            </Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  bg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#202020",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
    marginHorizontal: 24,
    marginBottom: 12,
    borderRadius: 24,
    paddingRight: 24,
    elevation: 3,
  },
  btn: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 100,
  },
  taskContainer: {
    height: "auto",
    width: SCREEN_WIDTH - 48,
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
  },
  taskTitle: {
    fontFamily: "medium",
    fontSize: 14,
    color: "#FFFF",
    paddingBottom: 4,
  },
  taskDesc: {
    fontFamily: "light",
    fontSize: 12,
    color: "#FFFF",
  },
});

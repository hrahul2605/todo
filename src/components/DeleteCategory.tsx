import React, { FunctionComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  TouchableOpacity,
  TapGestureHandler,
  State,
} from "react-native-gesture-handler";
import Animated, {
  useCode,
  cond,
  eq,
  set,
  call,
} from "react-native-reanimated";
import {
  spring,
  useTapGestureHandler,
  tapGestureHandler,
} from "react-native-redash";
import { WINDOW_HEIGHT } from "../constants";

interface Props {
  state: Animated.Value<0 | 1 | 2>;
  handleCategoryDelete: () => void;
  handleDeleteCancel: () => void;
  groupName: string;
}

const DeleteCategory: FunctionComponent<Props> = ({
  state: animationState,
  handleCategoryDelete,
  handleDeleteCancel,
  groupName,
}) => {
  const translateY = new Animated.Value(0);
  const config = { mass: 1, stiffness: 600, damping: 100 };

  useCode(
    () => [
      cond(
        eq(animationState, 1),
        set(translateY, spring({ from: translateY, to: WINDOW_HEIGHT, config }))
      ),
      cond(
        eq(animationState, 2),
        set(
          translateY,
          spring({ from: translateY, to: -WINDOW_HEIGHT, config })
        )
      ),
    ],
    [animationState]
  );

  const { gestureHandler, state } = useTapGestureHandler();
  return (
    <Animated.View
      style={{
        zIndex: 10,
        elevation: 10,
        transform: [{ translateY }],
        top: -WINDOW_HEIGHT,
        position: "absolute",
        left: 0,
        right: 0,
      }}
    >
      <Animated.View style={{ ...styles.container }}>
        <Text style={{ ...styles.heading }}>
          Are you sure you want to delete {groupName} Group?
        </Text>
        <View style={{ ...styles.btnContainer }}>
          <TouchableOpacity
            onPress={() => handleDeleteCancel()}
            style={{ ...styles.btn, marginRight: 8 }}
          >
            <Text style={{ ...styles.btnText }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.btn }}
            onPress={() => handleCategoryDelete()}
          >
            <Text style={{ ...styles.btnText }}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <TapGestureHandler onHandlerStateChange={() => handleDeleteCancel()}>
        <Animated.View style={{ height: WINDOW_HEIGHT }}></Animated.View>
      </TapGestureHandler>
    </Animated.View>
  );
};

export default DeleteCategory;

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: "auto",
    backgroundColor: "#444444",
    borderRadius: 12,
    position: "absolute",
    alignSelf: "center",
    elevation: 10,
    zIndex: 10,
    top: 130,
  },
  heading: {
    color: "#FFFF",
    fontSize: 14,
    fontFamily: "regular",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  btn: {
    height: 36,
    width: 83,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontFamily: "regular",
    fontSize: 12,
    color: "#FFFF",
  },
});

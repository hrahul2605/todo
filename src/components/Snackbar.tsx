import React, { FunctionComponent } from "react";
import { Text, StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../constants";
import { State } from "react-native-gesture-handler";
import Animated, {
  useCode,
  set,
  cond,
  eq,
  call,
} from "react-native-reanimated";
import { spring } from "react-native-redash";

interface Props {
  color: string;
  message: string;
  initial: Animated.Value<State>;
  setSnackState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Snackbar: FunctionComponent<Props> = ({
  color,
  message,
  initial,
  setSnackState,
}) => {
  const translateY = new Animated.Value(0);
  const config = { mass: 1, stiffness: 600, damping: 100 };

  useCode(
    () => [
      cond(eq(initial, State.ACTIVE), [
        set(
          translateY,
          spring({
            from: translateY,
            to: -56,
            config,
          })
        ),
        call([], () => setTimeout(() => initial.setValue(State.END), 1500)),
      ]),
      cond(eq(initial, State.END), [
        set(
          translateY,
          spring({
            from: translateY,
            to: 56,
            config,
          })
        ),
        call([], () => setTimeout(() => setSnackState(false), 100)),
      ]),
    ],
    [initial]
  );

  return (
    <Animated.View
      style={{
        ...styles.container,
        backgroundColor: color,
        transform: [{ translateY }],
      }}
    >
      <Text style={{ ...styles.message }}>{message}</Text>
    </Animated.View>
  );
};

export default Snackbar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: 48,
    width: SCREEN_WIDTH - 16,
    borderRadius: 12,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    bottom: -48,
    elevation: 8,
  },
  message: {
    fontSize: 14,
    fontFamily: "regular",
    color: "#FFFF",
  },
});

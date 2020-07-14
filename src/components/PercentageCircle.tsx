import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated from "react-native-reanimated";
import { spring } from "react-native-redash";

const { interpolate, multiply } = Animated;
const width = 100;
const size = width - 32;
const strokeWidth = 7;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { PI } = Math;
const r = (size - strokeWidth) / 2;
const cx = size / 2;
const cy = size / 2;

const PercentageCircle: React.FunctionComponent<{
  percentage: number;
}> = ({ percentage }) => {
  const progress = spring({ from: 0, to: 1, config: { mass: 1 } });
  const circumference = r * 2 * PI;
  const α = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [PI * 2, (PI * 2 * (100 - percentage)) / 100],
  });
  const strokeDashoffset = multiply(α, r);
  const percent = JSON.stringify(percentage);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Svg width={size} height={size} style={styles.container}>
        <Circle
          stroke="rgba(255, 255, 255, 0.2)"
          fill="none"
          {...{
            strokeWidth,
            cx,
            cy,
            r,
          }}
        />
        <AnimatedCircle
          stroke="white"
          fill="none"
          strokeDasharray={`${circumference}, ${circumference}`}
          {...{
            strokeDashoffset,
            strokeWidth,
            cx,
            cy,
            r,
          }}
        />
      </Svg>
      <View style={{ position: "absolute" }}>
        <Text style={{ color: "#FFFF", fontFamily: "bold" }}>
          {percent[0]}
          {percent[1] !== undefined ? percent[1] : null}
          {percent[2] !== undefined && percent[2] !== "." ? percent[2] : null}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    transform: [{ rotateZ: "270deg" }],
  },
});

export default PercentageCircle;

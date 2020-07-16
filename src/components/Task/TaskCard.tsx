import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, SCREEN_WIDTH, task } from "../../constants";
import PercentageCircle from "../PercentageCircle";

interface Props {
  color: string;
  name: string;
  desc?: string;
  navigation: StackNavigationProp<RootStackParamList>;
  onPressed?: (e: boolean) => void;
  isCategory: boolean;
  tasks?: task[];
  date?: string;
  percentage?: number;
  categoryId?: string;
}
function TaskCard({
  color,
  isCategory,
  onPressed,
  name,
  navigation,
  desc,
  tasks,
  date,
  percentage,
  categoryId,
}: Props) {
  const scale = new Animated.Value(1);

  const handlePressAnimation = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      mass: 1,
      stiffness: 40000,
      damping: 400,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scale, {
        toValue: 1,
        mass: 1,
        stiffness: 40000,
        damping: 400,
        useNativeDriver: true,
      }).start(() => {
        if (onPressed !== undefined) {
          onPressed(true);
        }
        navigation.navigate("CategoryTask", {
          taskName: name,
          bgColor: color,
          categoryId: categoryId,
        });
      });
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handlePressAnimation();
      }}
      disabled={!isCategory}
    >
      <Animated.View
        style={{
          ...styles.cardContainer,
          backgroundColor: color,
          transform: [{ scale }],
        }}
      >
        <View
          style={{
            marginTop: 24,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 36,
          }}
        >
          {isCategory && percentage !== undefined ? (
            <View style={{ marginBottom: 12 }}>
              <PercentageCircle percentage={percentage} />
            </View>
          ) : null}
          <View style={{ ...styles.cardText }}>
            <Text style={{ ...styles.cardTextHeading }}>{name}</Text>
            {desc !== undefined ? (
              <Text style={{ ...styles.cardTextDesc }}>{desc}</Text>
            ) : null}
            {isCategory ? (
              <Text style={{ ...styles.cardTextDesc }}>
                {tasks?.length} task remaining
              </Text>
            ) : null}
            {date !== undefined ? (
              <Text
                style={{
                  ...styles.cardTextDesc,
                  fontSize: 11,
                  fontFamily: "light",
                  paddingTop: 1,
                }}
              >
                {date.slice(0, 11)}
              </Text>
            ) : null}
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

export default TaskCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 0.4 * SCREEN_WIDTH,
    borderRadius: 45,
    marginBottom: 24,
    paddingHorizontal: 12,
    elevation: 10,
    zIndex: 10,
  },
  percentage: {
    height: 64,
    width: 64,
  },
  cardText: {
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTextHeading: {
    fontSize: 14,
    fontFamily: "medium",
    color: "#FFFF",
    textAlign: "center",
  },
  cardTextDesc: {
    fontSize: 12,
    fontFamily: "light",
    color: "#FFFF",
    textAlign: "center",
  },
});

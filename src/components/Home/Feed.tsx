import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../../constants";
import Plus from "../../assets/icons/plus.svg";
import Calendar from "../../assets/icons/calendar.svg";
import Clock from "../../assets/icons/clock.svg";
import Right from "../../assets/icons/right.svg";
import Loader from "../../assets/icons/loader.svg";

export default function Feed() {
  return (
    <View style={{ height: 260, width: SCREEN_WIDTH }}>
      <View style={{ ...styles.feedHeadingContainer }}>
        <Text style={{ ...styles.feedText }}>My tasks</Text>
        <View style={{ ...styles.feedEvents }}>
          <Calendar color="white" />
          <Plus color="white" />
        </View>
      </View>
      <View style={{ ...styles.feedsContainer }}>
        <View style={{ ...styles.feedIcon }}>
          <Clock color="white" />
        </View>
        <View style={{ ...styles.feedDetails }}>
          <Text style={{ ...styles.feedText, fontSize: 16 }}>To do.</Text>
          <Text style={{ ...styles.feedDesc }}>5 tasks now - 1 started</Text>
        </View>
      </View>
      <View style={{ ...styles.feedsContainer }}>
        <View style={{ ...styles.feedIcon, backgroundColor: "#F9BE7C" }}>
          <Loader color="white" />
        </View>
        <View style={{ ...styles.feedDetails }}>
          <Text style={{ ...styles.feedText, fontSize: 16 }}>In progess</Text>
          <Text style={{ ...styles.feedDesc }}>1 tasks now - 1 started</Text>
        </View>
      </View>
      <View style={{ ...styles.feedsContainer }}>
        <View style={{ ...styles.feedIcon, backgroundColor: "#6488E4" }}>
          <Right color="white" />
        </View>
        <View style={{ ...styles.feedDetails }}>
          <Text style={{ ...styles.feedText, fontSize: 16 }}>Done</Text>
          <Text style={{ ...styles.feedDesc }}>18 tasks now - 18 started</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  feedHeadingContainer: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  feedText: {
    color: "#ffffff",
    fontFamily: "semiBold",
    fontSize: 18,
  },
  feedEvents: {
    height: 32,
    width: 76,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
  },
  feedsContainer: {
    height: 56,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  feedIcon: {
    height: 44,
    width: 44,
    backgroundColor: "#E46472",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  feedDetails: {
    height: 44,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "auto",
    marginLeft: 12,
  },
  feedDesc: {
    fontFamily: "regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.75)",
  },
});

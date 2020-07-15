import React, { FunctionComponent, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  Animated,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList, days, time, SCREEN_WIDTH } from "../../constants";
import Left from "../../assets/icons/left.svg";
interface Props {
  navigation: NavigationProp<RootStackParamList>;
}

function RenderDates(props: any) {
  return (
    <TouchableOpacity style={{ ...styles.renderDateContainer }}>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "medium",
          color: props.item.date === new Date().getDate() ? "#FFCC66" : "#FFFF",
        }}
      >
        {props.item.day}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "bold",
          color: props.item.date === new Date().getDate() ? "#FFCC66" : "#FFFF",
        }}
      >
        {props.item.date}
      </Text>
    </TouchableOpacity>
  );
}

const Calender: FunctionComponent<Props> = ({ navigation }) => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      Animated.spring(translateX, {
        toValue: -SCREEN_WIDTH,
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
      Animated.spring(translateX, {
        toValue: 0,
        mass: 1,
        stiffness: 500,
        damping: 60,
        useNativeDriver: true,
      }).start();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Animated.View
      style={{
        flex: 1,
        paddingTop: 8,
        left: SCREEN_WIDTH,
        transform: [{ translateX }],
      }}
    >
      <View
        style={{
          elevation: 0.1,
          zIndex: 5,
          position: "absolute",
          top: 0,
          backgroundColor: "#282828",

          paddingTop: 8,
        }}
      >
        <View style={{ ...styles.headerContainer }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Left color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.headingContainer }}>
          <Text style={{ ...styles.headingText }}>Today</Text>
        </View>
        <View style={{ ...styles.nameContainer }}>
          <Text style={{ ...styles.nameText }}>
            Good morning, Captain Dushtu {/*  Name prop*/}
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            maxHeight: 88,
          }}
          contentContainerStyle={{ paddingVertical: 12, paddingLeft: 24 }}
        >
          {days.map((item, index) => {
            return <RenderDates item={item} key={index} />;
          })}
        </ScrollView>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 12,
          flexDirection: "row",
          paddingTop: 230,
        }}
      >
        <View style={{ ...styles.scrollViewLeftContainer }}>
          {time.map((item, index) => {
            return (
              <View key={index} style={{ ...styles.timeContainer }}>
                <Text style={{ ...styles.timeText }}>{item}</Text>
              </View>
            );
          })}
        </View>
        <View style={{ ...styles.scrollViewRightContainer }}>
          {time.map((item, index) => {
            return (
              <View key={index} style={{ ...styles.taskContainer }}>
                <View style={{ ...styles.taskDetail }}>
                  <Text style={{ ...styles.emptyText }}>
                    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    - - - -
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default Calender;

const styles = StyleSheet.create({
  renderDateContainer: {
    width: "auto",
    height: 64,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginRight: 15,
  },
  headerContainer: {
    height: 56,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingContainer: {
    height: 56,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headingText: {
    color: "#FFF",
    fontFamily: "bold",
    fontSize: 22,
  },
  nameContainer: {
    height: 24,
    flexDirection: "row",
    paddingLeft: 24,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  nameText: {
    fontFamily: "medium",
    color: "rgba(255, 255, 255, 0.75)",
  },
  scrollViewLeftContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 24,
    flex: 1,
  },
  timeContainer: {
    height: 48,
    width: 52,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    color: "#FFFF",
    fontSize: 14,
    fontFamily: "bold",
  },
  scrollViewRightContainer: {
    flex: 3.09,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingRight: 24,
  },
  taskContainer: {
    height: 48,
    width: 236,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  taskDetail: {
    height: 14,
    width: 236,
    borderRadius: 24,
  },
  emptyText: {
    fontFamily: "bold",
    color: "rgba(255, 255, 255, 0.12)",
    fontSize: 12,
  },
});

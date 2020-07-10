import React, { FunctionComponent } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Animated,
} from "react-native";
import Left from "../../assets/icons/left.svg";
import {
  SCREEN_WIDTH,
  month,
  day,
  RootStackParamList,
  SCREEN_HEIGHT,
} from "../../constants";
import Calendar from "../../assets/icons/calendar.svg";
import Edit from "../../assets/icons/edit.svg";
import Plus from "../../assets/icons/plus.svg";
import { StackNavigationProp } from "@react-navigation/stack";
import AddCategory from "./AddCategory";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "CreateTask">;
}

const CreateTask: FunctionComponent<Props> = (props) => {
  const date = new Date();

  const opacity = new Animated.Value(0);

  const mainViewOpacity = opacity.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [1, 1, 0.3],
  });

  const btnOpacity = opacity.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [1, 1, 0],
  });

  const scale = opacity.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0.7, 0.7, 1],
  });

  const elevation = opacity.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [-1, -1, 10],
  });

  const translateY = opacity.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, -SCREEN_HEIGHT, -SCREEN_HEIGHT],
  });

  const animateModal = () => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      mass: 0.5,
    }).start();
  };

  const closeModal = () => {
    Animated.spring(opacity, {
      toValue: 0,
      useNativeDriver: true,
      mass: 0.3,
    }).start();
  };

  return (
    <>
      <Animated.View
        style={{
          position: "absolute",
          elevation,
          opacity,
          transform: [{ scale, translateY }],
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
          top: SCREEN_HEIGHT,
          height: SCREEN_HEIGHT,
        }}
      >
        <AddCategory close={closeModal} />
      </Animated.View>
      <Animated.View
        style={{ ...styles.headerContainer, opacity: mainViewOpacity }}
      >
        <View style={{ ...styles.nav }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Left color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.heading }}>
          <Text style={{ ...styles.headingText }}>Create new task</Text>
        </View>
        <View style={{ ...styles.taskContainer }}>
          <View style={{ ...styles.title }}>
            <Text style={{ ...styles.titleText }}>Title</Text>
            <View style={{ ...styles.inputContainer }}>
              <TextInput
                placeholder="Chocolate Cake"
                placeholderTextColor="#000000"
                style={{ ...styles.titleInput }}
              />
            </View>
          </View>
          <View style={{ ...styles.title }}>
            <Text style={{ ...styles.titleText }}>Date</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholderTextColor="#000000"
                placeholder={`${day[date.getDay()]}, ${date.getDate()} ${
                  month[date.getMonth()].month
                }`}
                style={{ ...styles.dateInput }}
              />
              <View style={{ ...styles.calenderIcon }}>
                <Calendar color="#000000" />
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: SCREEN_WIDTH, opacity: mainViewOpacity }}
      >
        <View style={{ height: 315 }} />
        <View style={{ ...styles.timeContainer }}>
          <View style={{ ...styles.container }}>
            <View style={{ ...styles.timeTextContainer }}>
              <Text style={{ ...styles.timeText }}>Start time</Text>
              <Text style={{ ...styles.hourText }}>4.00</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...styles.ampmText }}>PM</Text>
            </View>
          </View>
          <View style={{ ...styles.container }}>
            <View style={{ ...styles.timeTextContainer }}>
              <Text style={{ ...styles.timeText }}>End time</Text>
              <Text style={{ ...styles.hourText }}>8.00</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ ...styles.ampmText }}>PM</Text>
            </View>
          </View>
        </View>
        <View style={{ ...styles.descContainer }}>
          <View style={{ ...styles.descLayer }}>
            <Text style={{ ...styles.timeText }}>Description</Text>
            <TextInput
              style={{ ...styles.descInput }}
              placeholder="Lorem ipsum dolor sit amet"
              placeholderTextColor="#FFFF"
            />
          </View>
        </View>
        <View style={{ ...styles.categoryContainer }}>
          <View style={{ height: "auto" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ ...styles.timeText }}>Category</Text>
              <TouchableOpacity onPress={() => animateModal()}>
                <Plus color="#FFFF" />
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.categoryItemContainer }}>
              <View style={{ ...styles.categoryItem }}>
                <Text style={{ ...styles.categoryItemText }}>Lorem ipsum</Text>
                <Edit width={12} color="white" />
              </View>
              <View style={{ ...styles.categoryItem }}>
                <Text style={{ ...styles.categoryItemText }}>
                  Lorem ipsum dolor sit amet
                </Text>
                <Edit width={12} color="white" />
              </View>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={{ ...styles.createTaskContainer, opacity: btnOpacity }}
      >
        <Text style={{ ...styles.createTaskText }}>Create Task</Text>
      </Animated.View>
    </>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  headerContainer: {
    height: 315,
    backgroundColor: "#FFCC66",
    borderBottomRightRadius: 45,
    borderBottomLeftRadius: 45,
    position: "absolute",
    elevation: 1,
    zIndex: 1,
  },
  nav: {
    height: 56,
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  heading: {
    height: 56,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: "center",
  },
  headingText: {
    color: "#000000",
    fontSize: 22,
    fontFamily: "bold",
  },
  taskContainer: {
    height: 203,
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "flex-start",
  },
  title: {
    height: 48,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 12,
    fontFamily: "regular",
    color: "#000000",
  },
  inputContainer: {
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderBottomWidth: 1,
    width: SCREEN_WIDTH - 48,
  },
  titleInput: {
    fontSize: 16,
    fontFamily: "medium",
    color: "black",
  },
  dateInput: {
    fontFamily: "medium",
    fontSize: 14,
    width: SCREEN_WIDTH - 48 - 72,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.12)",
  },
  calenderIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  timeContainer: {
    height: 96,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  container: {
    width: 144,
    height: 48,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  timeTextContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 92,
  },
  timeText: {
    fontSize: 12,
    fontFamily: "regular",
    color: "#DDDDDD",
  },
  hourText: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#FFFF",
    marginTop: 8,
  },
  ampmText: {
    top: 22,
    fontSize: 16,
    fontFamily: "medium",
    color: "#FFFF",
  },
  descContainer: {
    height: 106,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  descLayer: {
    height: 76,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
  },
  descInput: {
    color: "#FFFF",
    fontFamily: "medium",
    fontSize: 16,
    width: SCREEN_WIDTH - 48,
  },
  categoryContainer: {
    height: "auto",
    marginBottom: 50,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 34,
  },
  categoryItemContainer: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
  },
  categoryItem: {
    width: "auto",
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "#FFCC66",
    height: 29,
    flexDirection: "row",
    borderRadius: 50,
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 12,
    marginBottom: 6,
  },
  categoryItemText: {
    fontFamily: "regular",
    fontSize: 12,
    marginRight: 15,
  },
  createTaskContainer: {
    width: SCREEN_WIDTH - 48,
    height: 48,
    position: "absolute",
    backgroundColor: "#6488e4",
    borderRadius: 45,
    marginHorizontal: 24,
    elevation: 10,
    bottom: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  createTaskText: {
    fontSize: 14,
    color: "#FFFF",
    fontFamily: "bold",
  },
});

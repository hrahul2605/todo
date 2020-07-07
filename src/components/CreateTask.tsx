import * as React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import Left from "../assets/icons/left.svg";
import { SCREEN_WIDTH, month, day } from "../constants";
import Calendar from "../assets/icons/calendar.svg";
import Edit from "../assets/icons/edit.svg";

export default function CreateTask(props: any) {
  const date = new Date();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ ...styles.headerContainer }}>
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
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: SCREEN_WIDTH }}
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
            <View style={{ overflow: "hidden" }}>
              <TextInput
                style={{ ...styles.descInput }}
                placeholder="Lorem ipsum dolor sit amet"
                placeholderTextColor="#FFFF"
              />
            </View>
          </View>
        </View>
        <View style={{ ...styles.categoryContainer }}>
          <View style={{ height: "auto" }}>
            <Text style={{ ...styles.timeText }}>Category</Text>
            <View style={{ ...styles.categoryItemContainer }}>
              <View style={{ ...styles.categoryItem }}>
                <Text style={{ ...styles.categoryItemText }}>Lorem ipsum</Text>
                <Edit width={12} color="white" />
              </View>
              <View style={{ ...styles.categoryItem }}>
                <Text style={{ ...styles.categoryItemText }}>Lorem ipsum</Text>
                <Edit width={12} color="white" />
              </View>
              <View style={{ ...styles.categoryItem }}>
                <Text style={{ ...styles.categoryItemText }}>Lorem</Text>
                <Edit width={12} color="white" />
              </View>
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
      </ScrollView>
      <View style={{ ...styles.createTaskContainer }}>
        <Text style={{ ...styles.createTaskText }}>Create Task</Text>
      </View>
    </View>
  );
}

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

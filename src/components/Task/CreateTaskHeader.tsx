import React, { FunctionComponent } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import Calendar from "../../assets/icons/calendar.svg";
import Left from "../../assets/icons/left.svg";
import { SCREEN_WIDTH, day, month } from "../../constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface Props {
  goBack(): void;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  editScreen?: boolean;
  setDateAnimate?: React.Dispatch<React.SetStateAction<boolean>>;
  setTimeAnimate?: React.Dispatch<React.SetStateAction<boolean>>;
  reminder: string;
}

const CreateTaskHeader: FunctionComponent<Props> = ({
  goBack,
  title,
  setTitle,
  date,
  editScreen = false,
  setDateAnimate,
  setTimeAnimate,
  reminder,
}) => {
  const datee = new Date();
  return (
    <>
      <View style={{ ...styles.nav }}>
        <TouchableOpacity
          onPress={() => goBack()}
          style={{ ...styles.backBtn }}
        >
          <Left color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.heading }}>
        <Text style={{ ...styles.headingText }}>
          {!editScreen ? "Create new task" : "Edit task"}
        </Text>
      </View>
      <View style={{ ...styles.taskContainer }}>
        <View style={{ ...styles.title }}>
          <Text style={{ ...styles.titleText }}>Title</Text>
          <View style={{ ...styles.inputContainer }}>
            <TextInput
              style={{ ...styles.titleInput }}
              value={title}
              onChangeText={(text) => setTitle(text)}
              placeholder="Task Title"
              placeholderTextColor="rgba(0,0,0,0.3)"
              onFocus={() => {
                if (editScreen === undefined || editScreen === false) {
                  setTitle("");
                }
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ ...styles.detailContainer, marginRight: 12 }}>
            <View style={{ ...styles.title }}>
              <Text style={{ ...styles.titleText }}>Date</Text>
              <View style={{ flexDirection: "row" }}>
                <View pointerEvents="none">
                  <TextInput
                    placeholderTextColor="#000000"
                    placeholder={`${day[datee.getDay()]}, ${datee.getDate()} ${
                      month[datee.getMonth()].month
                    }`}
                    style={{ ...styles.dateInput }}
                    value={date.slice(0, 11)}
                  />
                </View>
                <View style={{ ...styles.calenderIcon }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (setDateAnimate !== undefined) {
                        setDateAnimate(true);
                      }
                    }}
                  >
                    <Calendar color="#000000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{ ...styles.detailContainer, marginLeft: 12 }}>
            <TouchableWithoutFeedback
              style={{ ...styles.title }}
              onPress={() => {
                if (setTimeAnimate !== undefined) {
                  setTimeAnimate(true);
                }
              }}
            >
              <Text style={{ ...styles.titleText }}>Reminder</Text>
              <Text style={{ ...styles.dateInput }}>{reminder}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </>
  );
};

export default CreateTaskHeader;

const styles = StyleSheet.create({
  nav: {
    height: 56,
    width: 72,
  },
  backBtn: {
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 24,
    height: "100%",
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
  },
  calenderIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  detailContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.12)",
    paddingBottom: 8,
  },
});

import React, { FunctionComponent } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList, days, time } from "../../constants";
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
  return (
    <>
      <View style={{ flex: 1 }}>
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
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 12,
              flexDirection: "row",
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
                        - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        - - - - - -
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Calender;

const styles = StyleSheet.create({
  renderDateContainer: {
    width: 32,
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
    width: 88,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 24,
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
    flex: 1,
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

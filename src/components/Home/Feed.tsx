import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SCREEN_WIDTH, task, RootStackParamList } from "../../constants";
import Plus from "../../assets/icons/plus.svg";
import Calendar from "../../assets/icons/calendar.svg";
import Clock from "../../assets/icons/clock.svg";
import Right from "../../assets/icons/right.svg";
import Loader from "../../assets/icons/loader.svg";
import { connect } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";

interface Category {
  tasks: task[];
  categoryName: string;
  categoryColor: string;
  categoryDesc: string;
  id: string;
}

interface Props {
  tasks: Array<task>;
  category: Category[];
  navigation: StackNavigationProp<RootStackParamList>;
}

const mapStateToProps = (state: {
  tasks: { tasks: Array<task> };
  category: { category: Array<Category> };
}) => ({
  tasks: state.tasks.tasks,
  category: state.category.category,
});

const Feed: React.FunctionComponent<Props> = ({
  category,
  navigation,
  tasks,
}) => {
  return (
    <View style={{ height: 260, width: SCREEN_WIDTH }}>
      <View style={{ ...styles.feedHeadingContainer }}>
        <Text style={{ ...styles.feedText }}>My tasks</Text>
        <View style={{ ...styles.feedEvents }}>
          <TouchableOpacity onPress={() => navigation.navigate("Calender")}>
            <Calendar color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateTask");
            }}
          >
            <Plus color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ ...styles.feedsContainer }}>
        <View style={{ ...styles.feedIcon }}>
          <Clock color="white" />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FeedScreen", {
              screen: "To do.",
              screenSub: "Giddy-up Captain!",
            });
          }}
          style={{ ...styles.feedDetails }}
        >
          <Text style={{ ...styles.feedText, fontSize: 16 }}>To do</Text>
          <Text style={{ ...styles.feedDesc }}>{tasks.length} tasks now</Text>
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.feedsContainer }}>
        <View style={{ ...styles.feedIcon, backgroundColor: "#F9BE7C" }}>
          <Loader color="white" />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FeedScreen", {
              screen: "In progress",
              screenSub: "Smells good! Something is cooking!",
            });
          }}
          style={{ ...styles.feedDetails }}
        >
          <Text style={{ ...styles.feedText, fontSize: 16 }}>In progess</Text>
          <Text style={{ ...styles.feedDesc }}>
            {category.length} tasks now
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.feedsContainer }}>
        <View style={{ ...styles.feedIcon, backgroundColor: "#6488E4" }}>
          <Right color="white" />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FeedScreen", {
              screen: "Done",
              screenSub: "Feel good about yourself",
            });
          }}
          style={{ ...styles.feedDetails }}
        >
          <Text style={{ ...styles.feedText, fontSize: 16 }}>Done</Text>
          <Text style={{ ...styles.feedDesc }}>18 tasks now - 18 started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default connect(mapStateToProps)(Feed);

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
    marginBottom: 12,
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
    flex: 1,
    marginLeft: 12,
  },
  feedDesc: {
    fontFamily: "regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.75)",
  },
});

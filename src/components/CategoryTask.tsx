import React, { FunctionComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Left from "../assets/icons/left.svg";
import Plus from "../assets/icons/plus.svg";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../constants";

interface Props {
  route: RouteProp<RootStackParamList, "CategoryTask">;
  navigation: StackNavigationProp<RootStackParamList, "CategoryTask">;
}

const CategoryTask: FunctionComponent<Props> = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ ...styles.nav }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Left color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("CreateTask")}
        >
          <Plus color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.headingContainer }}>
        <Text style={{ ...styles.headingText }}>
          {props.route.params.taskName}
        </Text>
      </View>
      <View style={{ ...styles.motivateTextContainer }}>
        <Text style={{ ...styles.motivateText }}>Giddy-up Captain!</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ ...styles.scrollStyle }}
        contentContainerStyle={{ ...styles.scrollContainer }}
      >
        <View
          style={{
            ...styles.taskContainer,
            backgroundColor: "#E46472",
            marginHorizontal: 24,
          }}
        >
          <Text style={{ ...styles.taskTitle }}>Chocholate cake</Text>
          <Text style={{ ...styles.taskDesc }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ...
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryTask;

const styles = StyleSheet.create({
  taskContainer: {
    height: "auto",
    width: 312,
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
  },
  taskTitle: {
    fontFamily: "medium",
    fontSize: 14,
    color: "#FFFF",
  },
  taskDesc: {
    fontFamily: "light",
    fontSize: 12,
    color: "#FFFF",
  },
  nav: {
    height: 56,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headingContainer: {
    height: 56,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headingText: {
    color: "#FFFF",
    fontSize: 22,
    fontFamily: "bold",
  },
  motivateTextContainer: {
    height: 24,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 24,
  },
  motivateText: {
    fontSize: 14,
    fontFamily: "medium",
    color: "rgba(255, 255, 255, 0.75)",
  },
  scrollContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  scrollStyle: {
    paddingVertical: 12,
  },
});

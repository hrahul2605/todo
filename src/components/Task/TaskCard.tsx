import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../constants";

interface Props {
  color: string;
  name: string;
  desc?: string;
  navigation: StackNavigationProp<RootStackParamList>;
}
function TaskCard(props: Props) {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("CategoryTask", {
          taskName: props.name,
          bgColor: props.color,
        })
      }
    >
      <View style={{ ...styles.cardContainer, backgroundColor: props.color }}>
        <View
          style={{
            marginVertical: 28,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ ...styles.percentage }}></View>
          <View style={{ ...styles.cardText }}>
            <Text style={{ ...styles.cardTextHeading }}>{props.name}</Text>
            <Text style={{ ...styles.cardTextDesc }}>{props.desc}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default TaskCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 144,
    height: "auto",
    borderRadius: 45,
    marginLeft: 24,
    marginBottom: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  percentage: {
    height: 64,
    width: 64,
    borderRadius: 64,
    marginBottom: 12,
    borderWidth:3,
    borderColor:"white"
  },
  cardText: {
    height: 41,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTextHeading: {
    fontSize: 15,
    fontFamily: "regular",
    color: "#FFFF",
    textAlign: "center",
  },
  cardTextDesc: {
    fontSize: 12,
    fontFamily: "light",
    color: "#FFFF",
  },
});

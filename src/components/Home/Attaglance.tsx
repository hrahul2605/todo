import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, task, Category, state } from "../../constants";
import { connect } from "react-redux";
import List from "../List";

const mapStateToProps = (state: state) => ({
  tasks: state.tasks.tasks,
  category: state.category.category,
});
interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  tasks?: Array<task>;
  category?: Category[];
}

function Attaglance({ navigation, tasks, category }: Props) {
  let data: any[] | undefined = category;
  let temp = tasks?.map((item) => {
    return item;
  });
  data = data?.concat(temp !== undefined ? temp : null);
  return (
    <View>
      <View style={{ ...styles.headingContainer }}>
        <Text style={{ ...styles.headingText }}>Atta Glance</Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          height: "auto",
        }}
      >
        <List navigation={navigation} data={data} />
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(Attaglance);

const styles = StyleSheet.create({
  headingContainer: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  headingText: {
    fontFamily: "semiBold",
    fontSize: 18,
    color: "#FFFF",
  },
});

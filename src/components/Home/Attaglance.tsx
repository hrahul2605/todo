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
  data = data?.filter((item) => {
    if (
      item.categoryName === undefined ||
      (item.categoryName !== undefined && item.tasks.length !== 0)
    ) {
      if (
        item.categoryName !== undefined ||
        (new Date(item.date).getDate() === new Date().getDate() &&
          new Date(item.date).getMonth() === new Date().getMonth() &&
          new Date(item.date).getFullYear() === new Date().getFullYear())
      ) {
        return item;
      }
    }
  });

  data?.sort(() => {
    return 0.5 - Math.random();
  });
  return (
    <View>
      <View style={{ ...styles.headingContainer }}>
        <Text style={{ ...styles.headingText }}>In the works</Text>
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

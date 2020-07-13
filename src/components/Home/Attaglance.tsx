import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import TaskCard from "../Task/TaskCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, task } from "../../constants";
import { connect } from "react-redux";
import List from "../List";

interface Category {
  tasks: task[];
  categoryName: string;
  categoryColor: string;
  categoryDesc?: string;
  id: string;
}
const mapStateToProps = (state: {
  tasks: { tasks: Array<task> };
  category: { category: Category[] };
}) => ({
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

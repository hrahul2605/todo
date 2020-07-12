import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import TaskCard from "../Task/TaskCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, task, SCREEN_WIDTH } from "../../constants";
import { connect } from "react-redux";

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
  data = data?.concat(temp !== undefined ? temp : []);
  return (
    <View>
      <View style={{ ...styles.headingContainer }}>
        <Text style={{ ...styles.headingText }}>Atta Glance</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <TaskCard
                name={item.categoryName || item.title}
                desc={item.categoryDesc || item.desc}
                color={item.categoryColor}
                navigation={navigation}
                isCategory={item.categoryName !== undefined}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{
            width: SCREEN_WIDTH,
            justifyContent: "center",
          }}
        />
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

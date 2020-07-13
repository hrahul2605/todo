import React, { FunctionComponent } from "react";
import { View, FlatList } from "react-native";
import TaskCard from "./Task/TaskCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../constants";

interface Props {
  data: any[] | undefined;
  navigation: StackNavigationProp<RootStackParamList>;
  setPressed?: (value: React.SetStateAction<boolean>) => void;
  isProgressScreen?: boolean;
}

const List: FunctionComponent<Props> = ({
  data,
  navigation,
  isProgressScreen = false,
  setPressed,
}) => {
  let data1 = data?.filter((item, index) => index % 2 === 0);
  let data2 = data?.filter((item, index) => index % 2 === 1);
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 12,
          paddingLeft: 24,
          paddingRight: 12,
        }}
      >
        <FlatList
          listKey="#LEFT"
          data={data2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            if (
              (item.categoryName !== undefined && item.tasks.length !== 0) ||
              item.title !== undefined ||
              isProgressScreen
            ) {
              return (
                <TaskCard
                  key={index}
                  name={item.categoryName || item.title}
                  desc={item.categoryDesc || item.desc}
                  color={item.categoryColor}
                  navigation={navigation}
                  isCategory={item.categoryName !== undefined}
                  tasks={item.tasks}
                  date={item.date}
                  onPressed={(e: boolean) =>
                    setPressed !== undefined ? setPressed(e) : undefined
                  }
                />
              );
            } else return null;
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 12,
          paddingRight: 24,
          paddingLeft: 12,
        }}
      >
        <FlatList
          listKey="#RIGHT"
          data={data1}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            if (
              (item.categoryName !== undefined && item.tasks.length !== 0) ||
              item.title !== undefined ||
              isProgressScreen
            ) {
              return (
                <TaskCard
                  key={index + 10000}
                  name={item.categoryName || item.title}
                  desc={item.categoryDesc || item.desc}
                  color={item.categoryColor}
                  navigation={navigation}
                  isCategory={item.categoryName !== undefined}
                  tasks={item.tasks}
                  date={item.date}
                  onPressed={(e: boolean) =>
                    setPressed !== undefined ? setPressed(e) : undefined
                  }
                />
              );
            } else return null;
          }}
        />
      </View>
    </>
  );
};

export default List;

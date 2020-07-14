import React, { FunctionComponent } from "react";
import { View, FlatList } from "react-native";
import TaskCard from "./Task/TaskCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../constants";

interface Props {
  data?: any[];
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
  if (!isProgressScreen) {
    data1 = data1?.filter((item, index) => {
      if (item.categoryName !== undefined) {
        if (item.tasks.length !== 0) {
          return item;
        }
      } else return item;
    });
    data2 = data2?.filter((item, index) => {
      if (item.categoryName !== undefined) {
        if (item.tasks.length !== 0) {
          return item;
        }
      } else return item;
    });
  }
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
          data={data1?.length === 0 ? data2 : data1}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            if (
              (item.categoryName !== undefined && item.tasks.length !== 0) ||
              item.title !== undefined ||
              isProgressScreen
            ) {
              let percentage = 0;
              if (item.categoryName !== undefined) {
                const taskLength = item.tasks.length;
                const doneLength = item.done.length;
                if (doneLength !== 0 || taskLength !== 0) {
                  percentage = (doneLength * 100) / (doneLength + taskLength);
                }
              }
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
                  percentage={percentage}
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
          data={data1?.length === 0 ? data1 : data2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            if (
              (item.categoryName !== undefined && item.tasks.length !== 0) ||
              item.title !== undefined ||
              isProgressScreen
            ) {
              let percentage = 0;
              if (item.categoryName !== undefined) {
                const taskLength = item.tasks.length;
                const doneLength = item.done.length;
                if (doneLength !== 0 || taskLength !== 0) {
                  percentage = (doneLength * 100) / (doneLength + taskLength);
                }
              }
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
                  percentage={percentage}
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

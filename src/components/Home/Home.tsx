import * as React from "react";
import { View, ScrollView } from "react-native";
import Header from "./Header";
import Feed from "./Feed";
import Attaglance from "./Attaglance";

export default function Home(props: any) {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 190 }} />
        <Feed navigation={{ ...props.navigation }} />
        <Attaglance />
      </ScrollView>
    </View>
  );
}

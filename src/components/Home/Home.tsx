import * as React from "react";
import { View, ScrollView } from "react-native";
import Header from "./Header";
import Feed from "./Feed";
import Attaglance from "./Attaglance";

export default class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ height: 210 }} />
          <Feed />
          <Attaglance />
        </ScrollView>
      </View>
    );
  }
}

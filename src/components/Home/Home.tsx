import * as React from "react";
import { View, ScrollView } from "react-native";
import Header from "./Header";
import Feed from "./Feed";
import Attaglance from "./Attaglance";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../constants";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Home: React.FunctionComponent<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 120 }} />
        <Feed navigation={navigation} />
        <Attaglance navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default Home;

import React, { FunctionComponent, useState } from "react";
import { View, TouchableOpacity, ScrollView, Text, Switch } from "react-native";
import Close from "../assets/icons/close.svg";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../constants";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "Settings">;
}

const Settings: FunctionComponent<Props> = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 12 }}>
      <View
        style={{
          height: 56,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Close color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 56,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#FFFF", fontSize: 22, fontFamily: "bold" }}>
          Settings
        </Text>
      </View>
      <View
        style={{
          height: "auto",
          paddingTop: 12,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            height: 48,
            paddingRight: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={{ color: "#FFFF", fontFamily: "regular", fontSize: 16 }}>
            Dark mode
          </Text>
          <Switch
            trackColor={{ false: "#282828", true: "#6488E4" }}
            thumbColor={
              isEnabled ? "rgba(255,255,255,1.0" : "rgba(255,255,255,1.0)"
            }
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Settings;

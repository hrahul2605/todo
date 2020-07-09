import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../../constants";
import Setting from "../../assets/icons/settings.svg";

export default function Header() {
  return (
    <View style={{ ...styles.headerContainer }}>
      <View style={{ ...styles.detailContainer }}>
        <View style={{ ...styles.userImage }} />
        <View style={{ ...styles.userContainer }}>
          <Text style={{ ...styles.userName }}>Dushtu Bunny</Text>
          <Text style={{ ...styles.userDesc }}>Captain Developer</Text>
        </View>
        <View
          style={{
            width: 93,
            height: 116,
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 12,
            justifyContent: "flex-end",
            alignItems: "flex-start",
            flexDirection: "row",
          }}
        >
          <Setting color="#000000" width={24} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#FFCC66",
    width: SCREEN_WIDTH,
    height: 120,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    position: "absolute",
    top: 0,
    elevation: 1,
  },
  detailContainer: {
    height: 110,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  userImage: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 80,
  },
  userContainer: {
    paddingHorizontal: 12,
    height: 80,
    width: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  userName: {
    color: "#000000",
    fontSize: 20,
    fontFamily: "bold",
  },
  userDesc: {
    color: "#000000",
    fontSize: 14,
    fontFamily: "regular",
  },
});

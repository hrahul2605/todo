import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SCREEN_WIDTH, STATUS_BAR } from "../../constants";
import Search from "../../assets/icons/search.svg";
import Menu from "../../assets/icons/menu.svg";

export default function Header() {
  return (
    <View style={{ ...styles.headerContainer }}>
      <View style={{ ...styles.bar }}>
        <Menu color="black" />
        <Search color="black" />
      </View>
      <View style={{ ...styles.detailContainer }}>
        <View style={{ ...styles.userImage }} />
        <View style={{ ...styles.userContainer }}>
          <Text style={{ ...styles.userName }}>Dushtu Bunny</Text>
          <Text style={{ ...styles.userDesc }}>Captain Developer</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#FFCC66",
    width: SCREEN_WIDTH,
    height: 180,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    marginTop: STATUS_BAR,
    position: "absolute",
    top: 0,
    elevation: 1,
  },
  bar: {
    width: SCREEN_WIDTH,
    height: 56,
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: "space-between",
    flexDirection: "row",
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

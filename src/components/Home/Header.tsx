import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SCREEN_WIDTH, RootStackParamList, state } from "../../constants";
import Setting from "../../assets/icons/settings.svg";
import { StackNavigationProp } from "@react-navigation/stack";
import { connect } from "react-redux";
import Ico from "../../assets/bigheads/1.svg";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  user: { userName: string; userDesc: string };
}

const mapStateToProps = (state: state) => ({
  user: state.user,
});

const Header: React.FunctionComponent<Props> = ({
  navigation,
  user: { userName, userDesc },
}) => {
  return (
    <>
      <View style={{ ...styles.headerContainer }}>
        <View style={{ ...styles.detailContainer }}>
          <View style={{ ...styles.userImage }}>
            <Ico preserveAspectRatio="none" width={100} height={100} />
          </View>
          <View style={{ ...styles.userContainer }}>
            <Text style={{ ...styles.userName }}>{userName}</Text>
            <Text style={{ ...styles.userDesc }}>{userDesc}</Text>
          </View>
        </View>
      </View>
      <View style={{ ...styles.settingsContainer }}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Setting color="#000000" width={24} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default connect(mapStateToProps)(Header);

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#FFCC66",
    width: SCREEN_WIDTH,
    height: 120,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    position: "absolute",
    top: 0,
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
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
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
  settingsContainer: {
    width: "100%",
    height: 116,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flexDirection: "row",
  },
});

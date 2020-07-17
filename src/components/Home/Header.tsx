import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  SCREEN_WIDTH,
  RootStackParamList,
  state,
  Avatar,
} from "../../constants";
import Setting from "../../assets/icons/settings.svg";
import { StackNavigationProp } from "@react-navigation/stack";
import { connect } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

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
  const [avatarId, setAvatarId] = React.useState(0);
  const changeAvatar = () => {
    setAvatarId(avatarId === Avatar.length - 1 ? 0 : avatarId + 1);
  };
  return (
    <>
      <View style={{ ...styles.headerContainer }}>
        <View style={{ ...styles.detailContainer }}>
          <TouchableWithoutFeedback
            onPress={() => changeAvatar()}
            style={{ ...styles.userImage }}
          >
            <Image
              source={Avatar[avatarId]}
              style={{ width: 80, height: 80 }}
            />
          </TouchableWithoutFeedback>
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
    height: 144,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    position: "absolute",
    top: 0,
    paddingTop: 24,
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
    height: 100,
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
    paddingTop: 40,
    paddingBottom: 12,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flexDirection: "row",
  },
});

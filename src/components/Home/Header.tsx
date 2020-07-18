import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SCREEN_WIDTH, state, Avatar } from "../../constants";
import { connect } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface Props {
  user: { userName: string; userDesc: string };
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const mapStateToProps = (state: state) => ({
  user: state.user,
});

const Header: React.FunctionComponent<Props> = ({
  user: { userName, userDesc },
  setModal,
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
          <TouchableWithoutFeedback onPress={() => setModal(true)}>
            <View style={{ ...styles.userContainer }}>
              <Text style={{ ...styles.userName }}>{userName}</Text>
              <Text style={{ ...styles.userDesc }}>{userDesc}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
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

import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Switch,
  StyleSheet,
  Animated,
  BackHandler,
} from "react-native";
import Close from "../assets/icons/close.svg";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, SCREEN_WIDTH, WINDOW_HEIGHT } from "../constants";
import AddCategory from "./Task/AddCategory";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "Settings">;
}

const Settings: FunctionComponent<Props> = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const mainViewOpacity = useRef(new Animated.Value(1)).current;

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (!modal) {
      animateMainViewDown();
    } else {
      animateMainViewUp();
    }
  }, [modal]);

  const animateMainViewUp = () => {
    Animated.timing(mainViewOpacity, {
      toValue: 0.3,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const animateMainViewDown = () => {
    Animated.timing(mainViewOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const transition = React.useRef(new Animated.Value(0)).current;

  const animateDown = () => {
    Animated.spring(transition, {
      toValue: 0,
      mass: 1,
      stiffness: 500,
      damping: 60,
      useNativeDriver: true,
    }).start();
  };
  const animateUp = () => {
    Animated.spring(transition, {
      toValue: 1,
      mass: 1,
      stiffness: 500,
      damping: 60,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    navigation.addListener("blur", () => {
      animateDown();
    });

    navigation.addListener("focus", (e) => {
      animateUp();
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (modal) {
          setModal(false);
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [modal])
  );

  const translateX = transition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -SCREEN_WIDTH],
  });

  return (
    <>
      <AddCategory modal={modal} setModal={setModal} type="Rename" />
      <Animated.ScrollView
        style={{
          ...styles.container,
          opacity: mainViewOpacity,
          transform: [{ translateX }],
          left: SCREEN_WIDTH,
        }}
      >
        <View style={{ ...styles.nav }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Close color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.headingContainer }}>
          <Text style={{ ...styles.headingText }}>Settings</Text>
        </View>
        <View style={{ ...styles.optionsContainer }}>
          <View style={{ ...styles.optionCard }}>
            <Text style={{ ...styles.optionText }}>Dark mode</Text>
            <Switch
              trackColor={{ false: "#282828", true: "#6488E4" }}
              thumbColor={
                isEnabled ? "rgba(255,255,255,1.0" : "rgba(255,255,255,1.0)"
              }
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <TouchableOpacity
            style={{ ...styles.optionCard }}
            onPress={() => setModal(true)}
          >
            <Text style={{ ...styles.optionText }}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.optionCard }}>
            <Text style={{ ...styles.optionText }}>Rate us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.optionCard }}>
            <Text style={{ ...styles.optionText }}>Contact us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.optionCard }}>
            <Text style={{ ...styles.optionText }}>Feedback</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    paddingTop: 24,
  },
  nav: {
    height: 56,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headingContainer: {
    height: 56,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headingText: {
    color: "#FFFF",
    fontSize: 22,
    fontFamily: "bold",
  },
  optionsContainer: {
    height: "auto",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  optionCard: {
    height: 48,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 12,
  },
  optionText: {
    color: "#FFFF",
    fontFamily: "regular",
    fontSize: 16,
  },
  addCategoryContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    top: WINDOW_HEIGHT,
    height: WINDOW_HEIGHT,
    elevation: 10,
  },
});

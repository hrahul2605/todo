import * as React from "react";
import {
  Animated,
  View,
  FlatList,
  StyleSheet,
  BackHandler,
} from "react-native";
import Header from "./Header";
import Feed from "./Feed";
import Attaglance from "./Attaglance";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, SCREEN_WIDTH } from "../../constants";
import { setStatusBarStyle } from "expo-status-bar";
import AddCategory from "../Task/AddCategory";
import { useFocusEffect, RouteProp } from "@react-navigation/native";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, "Home">;
}

const Home: React.FunctionComponent<Props> = ({ navigation, route }) => {
  const opacity = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    navigation.addListener("blur", () => {
      Animated.spring(opacity, {
        toValue: 0,
        mass: 1,
        stiffness: 500,
        damping: 60,
        useNativeDriver: true,
      }).start();
    });

    navigation.addListener("focus", () => {
      setStatusBarStyle("dark");
      Animated.spring(opacity, {
        toValue: 1,
        mass: 1,
        stiffness: 500,
        damping: 60,
        useNativeDriver: true,
      }).start();
    });
  }, [navigation]);

  const translateX = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_WIDTH, 0],
  });

  const [modal, setModal] = React.useState(false);
  const mainViewOpacity = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (!modal) {
      Animated.timing(mainViewOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(mainViewOpacity, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [modal]);

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

  return (
    <>
      <AddCategory
        modal={modal}
        setModal={setModal}
        type="Rename"
        handleSnackState={route.params?.handleSnackState}
      />
      <Animated.View
        style={{ ...styles.container, transform: [{ translateX }], opacity }}
      >
        <View style={{ ...styles.headerContainer }}>
          <Header setModal={setModal} />
        </View>
        <Animated.View style={{ opacity: mainViewOpacity }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 150 }}
            data={undefined}
            renderItem={undefined}
            ListEmptyComponent={
              <>
                <Feed navigation={navigation} />
                <Attaglance navigation={navigation} />
              </>
            }
          />
        </Animated.View>
      </Animated.View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    paddingTop: 24,
  },
  headerContainer: {
    zIndex: 10,
    position: "absolute",
  },
});

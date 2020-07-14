import * as React from "react";
import { Animated, View } from "react-native";
import Header from "./Header";
import Feed from "./Feed";
import Attaglance from "./Attaglance";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, SCREEN_WIDTH } from "../../constants";

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Home: React.FunctionComponent<Props> = ({ navigation }) => {
  const opacity = React.useRef(new Animated.Value(1)).current;

  const animateDown = () => {
    Animated.spring(opacity, {
      toValue: 0,
      mass: 1,
      stiffness: 500,
      damping: 60,
      useNativeDriver: true,
    }).start();
  };
  const animateUp = () => {
    Animated.spring(opacity, {
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

    navigation.addListener("focus", () => {
      animateUp();
    });
  }, [navigation]);

  const translateX = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_WIDTH, 0],
  });

  return (
    <View style={{ flex: 1, zIndex: 1 }}>
      <Animated.View
        style={{
          transform: [{ translateX }],
          opacity,
          zIndex: 1,
          position: "absolute",
          top: 0,
        }}
      >
        <Header navigation={navigation} />
      </Animated.View>
      <Animated.FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 150 }}
        data={[]}
        renderItem={{}}
        ListEmptyComponent={
          <>
            <Feed navigation={navigation} />
            <Attaglance navigation={navigation} />
          </>
        }
        style={{ opacity }}
      />
    </View>
  );
};

export default Home;

import React from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import Main from "./src/components/Main";

export default function App() {
  React.useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
    changeScreenOrientation();
  }, []);
  return <Main />;
}

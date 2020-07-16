import React from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { ConfigureStore } from "./src/redux/ConfigureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import Main from "./src/components/Main";

const { store, persistor } = ConfigureStore();

export default function App() {
  React.useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
    changeScreenOrientation();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}

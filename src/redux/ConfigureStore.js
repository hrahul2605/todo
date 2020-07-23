import { createStore, applyMiddleware } from "redux";
import { AsyncStorage, Platform } from "react-native";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { taskReducer } from "./reducers/taskReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { doneReducer } from "./reducers/doneReducer";
import { userReducer } from "./reducers/userReducer";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

const config = {
  key: "root",
  storage: AsyncStorage,
  debug: true,
};

export const ConfigureStore = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    
    onAction:function(notification){
      console.log("ACTION:",notification.action)
    },
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === "ios",
  });

  PushNotification.getChannels(function (channel_ids) {
    console.log(channel_ids);
  });

  const store = createStore(
    persistCombineReducers(config, {
      tasks: taskReducer,
      category: categoryReducer,
      done: doneReducer,
      user: userReducer,
    }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);

  return { store, persistor };
};

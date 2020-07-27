import * as Notifications from "expo-notifications";
import { task } from "../constants";

const addNotification = async ({ task }: { task: task }) => {
  const z = task.date + " " + task.reminder + ":00";
  const trigger = new Date(z);
  Notifications.scheduleNotificationAsync({
    content: {
      title: task.title,
      body: "Task Pending.",
    },
    trigger,
    identifier: task.id,
  });
};

const removeNotification = async ({ id }: { id: string }) => {
  Notifications.cancelScheduledNotificationAsync(id);
};

export { addNotification, removeNotification };

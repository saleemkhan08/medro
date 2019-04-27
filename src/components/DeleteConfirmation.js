import React from "react";
import { Alert } from "react-native";
export const showDeleteConfirmation = (callbackFunc, name) => {
  Alert.alert(
    "Delete " + name,
    "Are you sure you want to delete " + name,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => callbackFunc() }
    ],
    { cancelable: true }
  );
};

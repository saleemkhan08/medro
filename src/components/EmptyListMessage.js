import React from "react";
import { View, Text, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const messageHeight = height > 300 ? 300 : height;
export default (EmptyListMessage = props => (
  <View
    style={{
      flex: 1,
      height: messageHeight,
      width: width,
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Text
      style={{
        color: "#999",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
      }}
    >
      {props.message}
    </Text>
  </View>
));

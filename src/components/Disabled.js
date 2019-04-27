import React from "react";
import { View, Spinner } from "native-base";
import { infoColor } from "../styles/colors";

export const Disabled = props => {
  if (props.show) {
    return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          flex: 1,
          zIndex: 100,
          backgroundColor: "#ffffffaa",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Spinner color={infoColor} />
      </View>
    );
  }
  return <View />;
};

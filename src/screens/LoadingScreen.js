import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import { Text, View } from "native-base";
import { firebaseAuth } from "../store";
export class LoadingScreen extends Component {
  componentDidMount() {
    firebaseAuth.onAuthStateChanged(user => {
      let screen = "StackNavigator";
      if (user == null) {
        screen = "LoginScreen";
      }
      setTimeout(() => {
        this.props.navigation.navigate(screen);
      }, 900);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.drawerImage}
        />
        <Text style={styles.title}> Medro </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold"
  },
  drawerImage: {
    height: 80,
    width: 80
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default LoadingScreen;

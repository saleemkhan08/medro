import React, { Component } from "react";
import { Text, View, Button, Alert } from "react-native";

export class ProductDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <LogoTitle title={navigation.getParam("productName", "Medro")} />
      ),
      headerRight: (
        <Button
          onPress={() => Alert.alert("A sample alert")}
          title="Info"
          color="#fff"
        />
      )
    };
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>ID -> {this.props.navigation.getParam("productId", 0)}</Text>
        <Text>
          Name -> {this.props.navigation.getParam("productName", "Medro")}
        </Text>
      </View>
    );
  }
}

const LogoTitle = props => {
  return (
    <View>
      <Text
        style={{
          width: "100%",
          textAlign: "center",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 20
        }}
      >
        {props.title}
      </Text>
    </View>
  );
};

export default ProductDetailScreen;

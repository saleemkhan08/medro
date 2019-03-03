import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
export class ProductListHeader extends Component {
  render() {
    const { title, logout, openMenu } = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <TouchableOpacity onPress={openMenu}>
          <Icon
            type="MaterialCommunityIcons"
            name="menu"
            style={styles.headerBtn}
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            color: "#404080",
            fontWeight: "bold",
            fontSize: 20
          }}
        >
          {title}
        </Text>
        <TouchableOpacity onPress={logout}>
          <Icon
            type="MaterialCommunityIcons"
            name="logout"
            style={styles.headerBtn}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBtn: {
    color: "#404080",
    margin: 10
  }
});

export default ProductListHeader;

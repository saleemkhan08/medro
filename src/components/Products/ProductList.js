import React, { Component } from "react";
import { List, Text, Icon, Button, Card, CardItem, Body } from "native-base";
import { Image } from "react-native";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";

import { connect } from "react-redux";
import { removeProduct, setCurrentProductToView } from "./ProductActions";

export class ProductList extends Component {
  render() {
    const sampleImage = require("../../../assets/splash.png");
    const { products } = this.props.productReducer;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <List>
            {products.map(product => {
              return (
                <Card
                  key={product.id}
                  style={{ marginTop: 10, marginStart: 10, marginEnd: 10 }}
                >
                  <CardItem header>
                    <Body>
                      <Text>{product.name}</Text>
                      <Text note>{"Price : ₹​" + product.price}</Text>
                    </Body>
                    <TouchableOpacity
                      style={{ position: "absolute", top: 10, right: 0 }}
                      onPress={() =>
                        this.props.dispatch(removeProduct(product))
                      }
                    >
                      <Icon
                        type="EvilIcons"
                        name="close"
                        style={{ color: "#bb0a1e" }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ position: "absolute", top: 10, right: 30 }}
                      onPress={() => {
                        this.props.onProductEdit(product);
                      }}
                    >
                      <Icon
                        type="Feather"
                        name="edit-2"
                        style={{ fontSize: 20 }}
                      />
                    </TouchableOpacity>
                  </CardItem>
                  <CardItem cardBody>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.dispatch(setCurrentProductToView(product));
                      }}
                    >
                      <Image
                        style={{ height: 300, flex: 1 }}
                        source={sampleImage}
                      />
                    </TouchableOpacity>
                  </CardItem>
                  <CardItem footer>
                    <Text>Buy This On:</Text>
                    <Button
                      rounded
                      bordered
                      info
                      style={{ margin: 10 }}
                      onPress={() => {
                        Linking.openURL(product.amazon);
                      }}
                    >
                      <Text>Amazon</Text>
                    </Button>
                    <Button
                      rounded
                      bordered
                      info
                      style={{ margin: 10 }}
                      onPress={() => {
                        Linking.openURL(product.flipkart);
                      }}
                    >
                      <Text>Flipkart</Text>
                    </Button>
                  </CardItem>
                </Card>
              );
            })}
          </List>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  drawerImage: {
    height: 60,
    width: 60
  },
  rowItem: {
    padding: 0
  },
  titleContainer: {
    width: "100%",
    padding: 50,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});

const mapStateToProps = state => {
  return {
    reducer: state.CategoryReducer,
    productReducer: state.ProductReducer
  };
};
export default connect(mapStateToProps)(ProductList);

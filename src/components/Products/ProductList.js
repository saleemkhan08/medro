import React, { Component } from "react";
import {
  List,
  Text,
  Icon,
  Button,
  Card,
  CardItem,
  Body,
  View,
  Spinner
} from "native-base";
import { Image } from "react-native";
import { setCurrentProductToEdit } from "./ProductActions";
import { IndicatorViewPager, PagerDotIndicator } from "rn-viewpager";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";

import { connect } from "react-redux";
import { removeProduct } from "./ProductActions";
import EmptyListMessage from "../EmptyListMessage";
import { showDeleteConfirmation } from "../DeleteConfirmation";
import { infoColor } from "../../styles/colors";
import { Disabled } from "../Disabled";

export class ProductList extends Component {
  showImage = product => {
    const { images } = product;
    let imageUrls = [];
    if (images) {
      const keys = Object.keys(images);
      for (i = 0; i < keys.length; i++) {
        const value = images[keys[i]];
        imageUrls.push(value);
      }
      return (
        <View style={{ flex: 1 }}>
          <IndicatorViewPager
            style={{ height: 250 }}
            indicator={this.renderDotIndicator(imageUrls.length)}
          >
            {imageUrls.map((imgUrl, index) => {
              return (
                <Image
                  key={index}
                  style={{
                    height: 250,
                    resizeMode: "contain"
                  }}
                  source={{ uri: imgUrl }}
                />
              );
            })}
          </IndicatorViewPager>
        </View>
      );
    } else {
      const placeholder = require("../../../assets/placeholder.png");
      return (
        <Image
          style={{ height: 250, flex: 1, resizeMode: "contain" }}
          source={placeholder}
        />
      );
    }
  };

  render() {
    const { products, isLoading } = this.props.productReducer;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <List>
            {products.length > 0 ? (
              this.loadProducts(products)
            ) : (
              <EmptyListMessage
                message={isLoading ? "Loading..." : "No Products Found"}
              />
            )}
          </List>
        </ScrollView>
      </SafeAreaView>
    );
  }
  isDeleting = productId => {
    return this.props.productReducer.deleteProgress.includes(productId);
  };

  loadProducts = products => {
    return products.map(product => {
      const { images } = product;
      let imageUrls = [];
      if (images) {
        const keys = Object.keys(images);
        for (i = 0; i < keys.length; i++) {
          const value = images[keys[i]];
          imageUrls.push(value);
        }
      }
      return (
        <Card
          key={product.id}
          style={{ marginTop: 10, marginStart: 10, marginEnd: 10 }}
        >
          <Disabled show={this.isDeleting(product.id)} />
          <CardItem header>
            <Body>
              <Text>{product.name}</Text>
              <Text note>{"Price : ₹​" + product.price}</Text>
            </Body>
            <TouchableOpacity
              style={{ position: "absolute", top: 10, right: 0 }}
              onPress={() =>
                showDeleteConfirmation(() => {
                  this.props.dispatch(removeProduct(product));
                }, product.name)
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
              <Icon type="Feather" name="edit-2" style={{ fontSize: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: "absolute", top: 10, right: 68 }}
              onPress={() => {
                this.props.dispatch(setCurrentProductToEdit(product));
                this.props.navigation.navigate("ProductImagesScreen");
              }}
            >
              <Icon type="Feather" name="camera" style={{ fontSize: 20 }} />
            </TouchableOpacity>
          </CardItem>
          <CardItem cardBody>{this.showImage(product)}</CardItem>
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
    });
  };
  renderDotIndicator(count) {
    if (count > 1)
      return (
        <PagerDotIndicator
          pageCount={count}
          dotStyle={{ backgroundColor: "#aaa" }}
          selectedDotStyle={{ backgroundColor: "#46a6e2" }}
        />
      );
    else return <View />;
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

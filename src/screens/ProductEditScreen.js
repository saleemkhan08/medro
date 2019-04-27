import React, { Component } from "react";
import {
  Container,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
  View
} from "native-base";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Header } from "react-navigation";
import {
  updateProduct,
  addProduct,
  setCurrentProductToEdit
} from "../components/Products/ProductActions";
class ProductEditScreen extends Component {
  state = {
    categoryId: "",
    id: "",
    name: "",
    description: "",
    price: "",
    flipkart: "",
    amazon: ""
  };

  static navigationOptions = () => {
    return {
      title: "Product Editor"
    };
  };

  componentDidMount() {
    const { currentProduct } = this.props.productReducer;
    const { currentCategory } = this.props.categoryReducer;
    if (currentProduct) {
      this.setState({
        ...currentProduct
      });
    } else {
      this.setState({
        categoryId: currentCategory.id
      });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(setCurrentProductToEdit(undefined));
  }

  saveProduct = () => {
    const { currentProduct } = this.props.productReducer;
    if (currentProduct) {
      this.props.dispatch(updateProduct(this.state));
    } else {
      this.props.dispatch(addProduct(this.state));
    }
    this.props.navigation.goBack();
  };

  render() {
    const { currentProduct } = this.props.productReducer;
    const floatingLabel = currentProduct ? true : false;
    return (
      <Container>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Header.HEIGHT + 20} // adjust the value here if you need more padding
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
          behavior="padding"
        >
          <ScrollView>
            <Form style={{ padding: 10 }}>
              <Item style={{ marginTop: 5, marginEnd: 15 }}>
                <Input
                  placeholder="Product Name"
                  onChangeText={text => this.setState({ name: text })}
                  value={this.state.name}
                />
              </Item>
              <Item style={{ marginTop: 5, marginEnd: 15 }}>
                <Input
                  placeholder="Description"
                  onChangeText={text => this.setState({ description: text })}
                  value={this.state.description}
                />
              </Item>
              <Item style={{ marginTop: 5, marginEnd: 15 }}>
                <Input
                  placeholder="Price"
                  onChangeText={text => this.setState({ price: text })}
                  value={this.state.price}
                />
              </Item>
              <Item style={{ marginTop: 5, marginEnd: 15 }}>
                <Input
                  placeholder="Flipkart Link"
                  onChangeText={text => this.setState({ flipkart: text })}
                  value={this.state.flipkart}
                />
              </Item>
              <Item
                style={{
                  marginTop: 5,
                  marginBottom: 0,
                  marginEnd: 15
                }}
              >
                <Input
                  placeholder="Amazon Link"
                  onChangeText={text => this.setState({ amazon: text })}
                  value={this.state.amazon}
                />
              </Item>
            </Form>
            <View
              style={{
                flex: 2,
                flexDirection: "row",
                margin: 10,
                marginTop: 0,
                justifyContent: "space-between"
              }}
            >
              <Button
                style={{
                  margin: 10,
                  flex: 1,
                  color: "#999",
                  borderColor: "#999"
                }}
                rounded
                light
                bordered
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <Text
                  style={{ width: "100%", textAlign: "center", color: "#999" }}
                >
                  Cancel
                </Text>
              </Button>
              <Button
                style={{ margin: 10, flex: 1 }}
                success
                rounded
                bordered
                onPress={this.saveProduct}
              >
                <Text style={{ width: "100%", textAlign: "center" }}>Save</Text>
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    categoryReducer: state.CategoryReducer,
    productReducer: state.ProductReducer
  };
};
export default connect(mapStateToProps)(ProductEditScreen);

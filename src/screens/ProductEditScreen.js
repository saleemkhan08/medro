import React, { Component } from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
  View
} from "native-base";
import { connect } from "react-redux";
import {
  updateProduct,
  addProduct
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

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
    };
  };

  componentDidMount() {
    const { currentProductToEdit } = this.props.productReducer;
    const title = currentProductToEdit ? "Edit Product" : "Add Product";
    const { currentCategory } = this.props.categoryReducer;
    this.props.navigation.setParams({ title: title });
    if (currentProductToEdit) {
      this.setState({
        ...currentProductToEdit
      });
    } else {
      this.setState({
        categoryId: currentCategory.id
      });
    }
  }

  saveProduct = () => {
    const { currentProductToEdit } = this.props.productReducer;
    if (currentProductToEdit) {
      this.props.dispatch(updateProduct(this.state));
    } else {
      this.props.dispatch(addProduct(this.state));
    }
    this.props.navigation.goBack();
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Product Name</Label>
              <Input
                onChangeText={text => this.setState({ name: text })}
                value={this.state.name}
              />
            </Item>
            <Item floatingLabel>
              <Label>Description</Label>
              <Input
                onChangeText={text => this.setState({ description: text })}
                value={this.state.description}
              />
            </Item>
            <Item floatingLabel>
              <Label>Price</Label>
              <Input
                onChangeText={text => this.setState({ price: text })}
                value={this.state.price}
              />
            </Item>
            <Item floatingLabel>
              <Label>Flipkart Link</Label>
              <Input
                onChangeText={text => this.setState({ flipkart: text })}
                value={this.state.flipkart}
              />
            </Item>
            <Item floatingLabel>
              <Label>Amazon Link</Label>
              <Input
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
        </Content>
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

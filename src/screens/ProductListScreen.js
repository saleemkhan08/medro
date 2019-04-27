import React, { Component } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { Content, Container } from "native-base";
import { firebaseAuth } from "../store";
import ProductListHeader from "../components/Products/ProductListHeader";
import ProductList from "../components/Products/ProductList";
import { setCurrentProductToEdit } from "../components/Products/ProductActions";
import { connect } from "react-redux";
import { Permissions } from "expo";
import { fetchCategories } from "../components/Categories/CategoryActions";
const ADD_PRODUCT = "plus";

export class ProductListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <ProductListHeader
          action={ADD_PRODUCT}
          onActionClicked={navigation.getParam("onActionClicked")}
          title={"Medro"}
          openMenu={navigation.getParam("onMenuClicked")}
        />
      ),
      drawerLockMode: "locked-closed"
    };
  };

  async componentDidMount() {
    this.props.dispatch(fetchCategories());
    firebaseAuth.onAuthStateChanged(user => {
      if (user == null) {
        this.props.navigation.navigate("LoginScreen");
      }
    });
    this.props.navigation.setParams({ onActionClicked: this.onProductAdd });
    this.props.navigation.setParams({ onMenuClicked: this.openDrawer });
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  onProductAdd = () => {
    this.props.dispatch(setCurrentProductToEdit(undefined));
    this.props.navigation.navigate("ProductEditScreen");
  };

  onProductEdit = product => {
    this.props.dispatch(setCurrentProductToEdit(product));
    this.props.navigation.navigate("ProductEditScreen");
  };

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: "#eee" }}>
          <ProductList
            onProductEdit={this.onProductEdit}
            navigation={this.props.navigation}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight
  }
});

export default connect()(ProductListScreen);

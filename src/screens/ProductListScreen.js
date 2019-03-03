import React, { Component } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { Text, Content, Header, Container } from "native-base";
import * as firebase from "firebase";
import ProductListHeader from "../components/ProductListHeader";
import { connect } from "react-redux";
export class ProductListScreen extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user == null) {
        this.props.navigation.navigate("LoginScreen");
      }
    });
  }

  render() {
    const { category } = this.props.reducer.currentCategory;
    return (
      <Container>
        <Header
          style={{
            marginTop: StatusBar.currentHeight,
            backgroundColor: "#fff"
          }}
        >
          <ProductListHeader
            title={"Medro"}
            openMenu={() => {
              this.props.navigation.openDrawer();
            }}
            logout={() => {
              firebase.auth().signOut();
              this.props.navigation.navigate("LoginScreen");
            }}
          />
        </Header>
        <Content>
          <Text> {category} </Text>
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
const mapStateToProps = state => {
  return {
    reducer: state.CategoryReducer
  };
};
export default connect(mapStateToProps)(ProductListScreen);

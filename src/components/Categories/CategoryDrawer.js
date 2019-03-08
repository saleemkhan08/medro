import React, { Component } from "react";
import {
  View,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
  Button,
  Body
} from "native-base";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import {
  fetchCategories,
  removeCategory,
  setCurrentCategory
} from "./CategoryActions";
import AddCategoryDialog from "./AddCategoryDialog";
import * as firebase from "firebase";
export class CategoryDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      user: {}
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchCategories());
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.email;
        this.setState({
          user
        });
      }
    });
  }
  render() {
    const { categories, currentCategory } = this.props.reducer;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.drawerImage}
          />
          <Text style={styles.title}>MEDRO</Text>
          <Text style={{ textAlign: "center" }}> {this.state.user.email} </Text>
        </View>
        <AddCategoryDialog
          open={this.state.open}
          onClose={() => {
            this.setState({
              open: false
            });
          }}
        />
        <ScrollView style={{ flex: 1 }}>
          <List>
            <ListItem itemDivider first>
              <Text>Categories</Text>
            </ListItem>

            {categories.map(category => {
              return (
                <ListItem
                  key={category.id}
                  selected={currentCategory.id == category.id}
                  onPress={() => {
                    this.props.dispatch(setCurrentCategory(category));
                    this.props.navigation.closeDrawer();
                  }}
                >
                  <Left>
                    <Text>{category.name}</Text>
                  </Left>
                  <Right>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.dispatch(removeCategory(category.id))
                      }
                    >
                      <Icon
                        type="EvilIcons"
                        name="close"
                        style={{ color: "#bb0a1e" }}
                      />
                    </TouchableOpacity>
                  </Right>
                </ListItem>
              );
            })}
            <Button
              full
              bordered
              rounded
              style={{ margin: 10 }}
              onPress={() => {
                this.setState({
                  open: true
                });
              }}
            >
              <Text>ADD</Text>
            </Button>
            <ListItem itemDivider>
              <Text>Account</Text>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon type="FontAwesome" name="user" />
              </Left>
              <Body>
                <Text>Profile</Text>
              </Body>
              <Right />
            </ListItem>
            <ListItem
              icon
              onPress={() => {
                firebase.auth().signOut();
                this.props.navigation.navigate("LoginScreen");
              }}
            >
              <Left>
                <Icon type="MaterialCommunityIcons" name="logout" />
              </Left>
              <Body>
                <Text>Logout</Text>
              </Body>
              <Right />
            </ListItem>
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
    reducer: state.CategoryReducer
  };
};
export default connect(mapStateToProps)(CategoryDrawer);

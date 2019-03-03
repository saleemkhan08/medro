import React, { Component } from "react";
import {
  View,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Icon,
  Button
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

export class CategoryDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    //const categories = ["Wallets", "Belts", "Shoes", "Jackets"];
    const { categories, currentCategory } = this.props.reducer;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.drawerImage}
          />
          <Text style={styles.title}>MEDRO</Text>
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
            {categories.map(({ category, key }) => {
              return (
                <ListItem
                  key={key}
                  selected={currentCategory.category == category}
                  onPress={() => {
                    this.props.dispatch(setCurrentCategory({ category, key }));
                    this.props.navigation.closeDrawer();
                  }}
                >
                  <Left>
                    <Text>{category}</Text>
                  </Left>
                  <Right>
                    <TouchableOpacity
                      onPress={() => this.props.dispatch(removeCategory(key))}
                    >
                      <Icon
                        type="FontAwesome"
                        name="remove"
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
              style={{ margin: 10, marginTop: 20 }}
              onPress={() => {
                this.setState({
                  open: true
                });
              }}
            >
              <Text>ADD</Text>
            </Button>
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

import React from "react";
import { Root, Spinner } from "native-base";
import { Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "./src/screens/LoadingScreen";
import ProductListScreen from "./src/screens/ProductListScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CategoryDrawer from "./src/components/Categories/CategoryDrawer";
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import { store } from "./src/store";
import { Provider } from "react-redux";
/*
1. Website will only have products for display
2. Website will have chat option to enquire about the bulk orders
3. To buy any products users will be redirected to amazon or flipkart based on user preferences
4. App will have all the editing options without authentication in the begining later, 
   it will be added based on the performance of the website.
*/

const DrawerNavigator = createDrawerNavigator(
  {
    ProductListScreen
  },
  {
    contentComponent: CategoryDrawer
  }
);

const AppNavigator = createSwitchNavigator({
  LoadingScreen,
  LoginScreen,
  DrawerNavigator
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({
      isLoading: false
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Root>
          <Spinner color="blue" />
        </Root>
      );
    }
    return (
      <Root>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </Root>
    );
  }
}

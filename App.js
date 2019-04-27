import React from "react";
import { Root, View } from "native-base";
import { Font, SplashScreen } from "expo";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "./src/screens/LoadingScreen";
import ProductListScreen from "./src/screens/ProductListScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CategoryDrawer from "./src/components/Categories/CategoryDrawer";
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator
} from "react-navigation";
import { store } from "./src/store";
import { Provider } from "react-redux";
import ProductEditScreen from "./src/screens/ProductEditScreen";
import ProductImagesScreen from "./src/screens/ProductImagesScreen";
import { YellowBox } from "react-native";

const StackNavigator = createStackNavigator({
  ProductListScreen,
  ProductEditScreen,
  ProductImagesScreen
});

const DrawerNavigator = createDrawerNavigator(
  {
    StackNavigator
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
    YellowBox.ignoreWarnings(["Setting a timer"]);
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
    SplashScreen.hide();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Root>
          <View />
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

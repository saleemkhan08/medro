import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  View,
  ScrollView
} from "react-native";
import { Input, Item, Button, Label, Toast, Text, Spinner } from "native-base";
import { firebaseAuth } from "../store";
import { infoColor } from "../styles/colors";
export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      resettingPassword: false,
      loggingIn: false
    };
  }

  showToast = message => {
    Toast.show({
      text: message
    });
  };

  login = () => {
    const { email, password } = this.state;
    if (email.indexOf("@") <= 0) {
      this.showToast("Please enter a valid mail ID");
    } else if (password.length < 6) {
      this.showToast("Password should have at least 6 characters");
    } else {
      this.setState({ loggingIn: true });
      firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ loggingIn: false });
          this.props.navigation.navigate("ProductListScreen");
        })
        .catch(err => {
          console.log(err.toString());
          this.setState({ loggingIn: false });
          this.showToast("Please Contact admin!");
        });
    }
  };

  forgotPwd = () => {
    const { email } = this.state;
    if (email.indexOf("@") <= 0) {
      this.showToast("Please enter a valid mail ID");
    } else {
      this.showToast('Sending Password Reset mail to "' + email + '"');
      this.setState({
        resettingPassword: true
      });
      firebaseAuth
        .sendPasswordResetEmail(email)
        .then(() => {
          this.showToast("Mail sent!");
          this.setState({
            resettingPassword: false
          });
        })
        .catch(err => {
          console.log(err.toString());
          this.showToast("Please Contact admin!");
          this.setState({
            resettingPassword: false
          });
        });
    }
  };

  componentDidMount() {}

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        behavior="padding"
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.drawerImage}
          />
          <Text style={styles.title}> Medro </Text>

          <View style={styles.formContainer}>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                disabled={this.state.resettingPassword || this.state.loggingIn}
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item floatingLabel style={{ marginTop: 10 }}>
              <Label>Password</Label>
              <Input
                disabled={this.state.resettingPassword || this.state.loggingIn}
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry
                onChangeText={password => this.setState({ password })}
              />
            </Item>
          </View>
          <View style={{ width: "100%" }}>
            <Button
              full
              rounded
              info
              style={styles.loginBtn}
              disabled={this.state.resettingPassword || this.state.loggingIn}
              onPress={this.login}
            >
              {this.state.loggingIn ? (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text>LOGGING IN ... </Text>
                  <Spinner
                    color={infoColor}
                    style={{ height: 20, width: 20, marginStart: 20 }}
                  />
                </View>
              ) : (
                <Text>LOGIN</Text>
              )}
            </Button>
            <Button
              full
              disabled={this.state.resettingPassword || this.state.loggingIn}
              transparent
              style={styles.forgotPwdBtn}
              onPress={this.forgotPwd}
            >
              <Text style={styles.forgotPwd} uppercase={false}>
                Forgot Password?
              </Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  drawerImage: {
    height: 80,
    width: 80
  },
  formContainer: {
    padding: 20,
    paddingTop: 0,
    width: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    margin: 10
  },
  loginBtn: { margin: 10 },
  forgotPwd: {
    color: infoColor
  },
  forgotPwdBtn: {
    margin: 0,
    marginTop: -10
  }
});
export default LoginScreen;

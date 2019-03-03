import React, { Component } from "react";
import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import {
  Container,
  Input,
  Item,
  Button,
  Label,
  Toast,
  Content
} from "native-base";

import * as firebase from "firebase";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.props.navigation.navigate("ProductListScreen");
        })
        .catch(err => {
          console.log(err.toString());
          this.showToast("Please Contact admin!");
        });
    }
  };

  forgotPwd = () => {
    const { email } = this.state;
    if (email.indexOf("@") <= 0) {
      this.showToast("Please enter a valid mail ID");
    } else {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          this.showToast("Mail sent!");
        })
        .catch(err => {
          console.log(err.toString());
          this.showToast("Please Contact admin!");
        });
    }
  };

  componentDidMount() {}

  render() {
    return (
      <Container style={styles.container}>
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
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel style={{ marginTop: 10 }}>
            <Label>Password</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Button
            full
            rounded
            info
            style={styles.loginBtn}
            onPress={this.login}
          >
            <Text style={{ color: "#fff" }}>LOGIN</Text>
          </Button>
          <Button
            full
            transparent
            style={styles.forgotPwdBtn}
            onPress={this.forgotPwd}
          >
            <Text style={styles.forgotPwd}>Forgot Password?</Text>
          </Button>
        </View>
      </Container>
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
  loginBtn: { margin: 10, marginTop: 30 },
  forgotPwd: {
    color: "#404080"
  },
  forgotPwdBtn: {
    margin: 0,
    marginTop: -10
  }
});
export default LoginScreen;

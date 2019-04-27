import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler
} from "react-native";
import { HeaderBackButton } from "react-navigation";
import { Button, Icon, Spinner, Text } from "native-base";
import { connect } from "react-redux";
import GridList from "react-native-grid-list";
import {
  uploadImage,
  deleteImage
} from "../components/Products/ProductActions";
import { storage } from "../store";
import ImageBrowser from "../components/ImageBrowser/ImageBrowser";
const uuidv1 = require("uuid/v1");
class ProductImagesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Product Images",
      headerLeft: (
        <HeaderBackButton
          onPress={() => {
            if (!navigation.getParam("handelBackBtnPress")()) {
              navigation.goBack();
            }
          }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      imageBrowserOpen: false,
      photos: [],
      isUploading: false
    };
  }
  imageBrowserCallback = callback => {
    callback
      .then(photos => {
        this.setState({
          imageBrowserOpen: false,
          photos
        });
      })
      .catch(e => console.log(e));
  };

  renderImageTile = ({ key, uri, index }) => {
    return (
      <View style={styles.imageContainer} key={index}>
        <Image style={styles.imageThumbnail} source={{ uri: uri }} />
        <TouchableOpacity
          disabled={this.state.isUploading}
          style={{ position: "absolute", top: 5, right: 5 }}
          onPress={() => {
            if (key) {
              this.props.dispatch(deleteImage(this.state.currentProduct, key));
            } else {
              this.removeImgFromState(uri);
            }
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              opacity: 0.7,
              borderRadius: 100,
              padding: 1,
              paddingBottom: 3,
              paddingTop: 3
            }}
          >
            <Icon
              type="EvilIcons"
              name="close"
              style={{ fontSize: 20, color: "#bb0a1e" }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  componentDidMount() {
    const { currentProduct } = this.props.productReducer;
    this.setState({ currentProduct });
    this.props.navigation.setParams({
      handelBackBtnPress: this.handelBackBtnPress
    });
    BackHandler.addEventListener("hardwareBackPress", this.handelBackBtnPress);
  }
  handelBackBtnPress = () => {
    if (this.state.imageBrowserOpen) {
      this.setState({ imageBrowserOpen: false });
      return true;
    }
    return false;
  };

  uploadImages = async () => {
    try {
      const photos = [...this.state.photos];
      photos.forEach(async photo => {
        await this.uploadImageAsync(photo.file);
        this.removeImgFromState(photo.file);
        this.setState({
          isUploading: this.state.photos.length > 0
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  removeImgFromState = uri => {
    const newPhotoList = [...this.state.photos];
    let imgIndex = -1;
    newPhotoList.forEach((photo, i) => {
      if (photo.file === uri) {
        imgIndex = i;
      }
    });
    newPhotoList.splice(imgIndex, 1);
    this.setState({
      photos: newPhotoList
    });
  };

  uploadImageAsync = async uri => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const imgName = uuidv1();
    const ref = storage
      .ref()
      .child("images")
      .child(this.state.currentProduct.id)
      .child(imgName);
    const snapshot = await ref.put(blob);
    blob.close();
    const uploadUrl = await snapshot.ref.getDownloadURL();
    this.props.dispatch(
      uploadImage(this.state.currentProduct, uploadUrl, imgName)
    );
  };

  uploadToStorage = uri => {
    this.props.dispatch(uploadImage(currentProduct));
  };
  render() {
    if (this.state.imageBrowserOpen) {
      return <ImageBrowser max={4} callback={this.imageBrowserCallback} />;
    }
    const { photos } = this.state;
    const { currentProduct } = this.props.productReducer;
    let imageUrls = [];
    if (currentProduct.images) {
      const keys = Object.keys(currentProduct.images);
      for (i = 0; i < keys.length; i++) {
        const value = currentProduct.images[keys[i]];
        imageUrls.push({ uri: value, key: keys[i] });
      }
    }
    return (
      <ScrollView>
        <View>
          {imageUrls.length > 0 ? (
            <View>
              <GridList
                showSeparator
                data={imageUrls}
                numColumns={3}
                renderItem={({ item, index }) =>
                  this.renderImageTile({ key: item.key, uri: item.uri, index })
                }
              />
            </View>
          ) : (
            <View style={{ justifyContent: "center", flex: 1, height: 150 }}>
              <Text
                style={{
                  width: "100%",
                  color: "#aaa",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                No Uploaded Images
              </Text>
            </View>
          )}

          {photos.length > 0 ? (
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 24,
                  marginStart: 10,
                  marginTop: 20,
                  marginBottom: 5
                }}
              >
                Ready to Upload
              </Text>
              <GridList
                showSeparator
                data={photos}
                numColumns={3}
                renderItem={({ item, i }) => {
                  const imgUri = item.file;
                  return this.renderImageTile({
                    key: undefined,
                    uri: imgUri,
                    index: i
                  });
                }}
              />
              <Button
                full
                rounded
                bordered
                info
                onPress={() => {
                  this.setState({ isUploading: true });
                  this.uploadImages();
                }}
                disabled={this.state.isUploading}
                style={{ margin: 20, marginTop: 10 }}
              >
                {this.state.isUploading ? (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>UPLOADING ... </Text>
                    <Spinner
                      style={{ height: 25, width: 25, marginStart: 20 }}
                    />
                  </View>
                ) : (
                  <Text style={{ fontSize: 18 }}>UPLOAD</Text>
                )}
              </Button>
            </View>
          ) : (
            <Button
              full
              rounded
              bordered
              info
              onPress={() => {
                this.setState({ imageBrowserOpen: true });
              }}
              style={{ margin: 20, marginTop: 10 }}
            >
              <Text style={{ fontSize: 18 }}>ADD</Text>
            </Button>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    categoryReducer: state.CategoryReducer,
    productReducer: state.ProductReducer
  };
};
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    paddingTop: 30
  },
  imageContainer: {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1
  },
  imageThumbnail: {
    height: 100
  }
});
export default connect(mapStateToProps)(ProductImagesScreen);

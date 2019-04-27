import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight
} from "react-native";
const { width } = Dimensions.get("window");

class ImageTile extends React.PureComponent {
  render() {
    let { item, index, selected, selectImage } = this.props;
    const imgContainerWidth = width / 4 - 10;
    const imgWidth = imgContainerWidth - 12;
    if (!item) return null;
    return (
      <TouchableHighlight
        style={{
          opacity: selected ? 0.5 : 1,
          width: imgContainerWidth,
          height: imgContainerWidth,
          borderRadius: 5,
          borderWidth: 1,
          margin: 5,
          padding: 5,
          borderColor: "#ddd"
        }}
        underlayColor="transparent"
        onPress={() => selectImage(index)}
      >
        <Image
          style={{
            width: imgWidth,
            height: imgWidth
          }}
          source={{ uri: item }}
        />
      </TouchableHighlight>
    );
  }
}
export default ImageTile;

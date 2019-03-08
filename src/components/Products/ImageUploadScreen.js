import { ImagePicker } from "expo";
import * as firebase from "firebase";

onUploadImagePress = async () => {
  let results = await ImagePicker.launchImageLibraryAsync();
  if (!results.cancelled) {
    this.uploadImage(results.uri);
  }
};

uploadImage = async uri => {
  const response = await fetch(uri);
  const blob = await response.blob();
  let ref = firebase
    .storage()
    .ref()
    .child("images/name");
  return ref.put(blob);
};

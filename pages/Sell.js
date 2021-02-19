import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import firebase from "../firebase";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  Keyboard,
  TextInput,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Feather";
import { Camera } from "expo-camera";
import RNPickerSelect from "react-native-picker-select";
import isEmpty from "is-empty";
import * as fireActions from "../redux/actions/FireActions";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import * as ImageManipulator from "expo-image-manipulator";
import { firestore } from "firebase";

export default function Sell({ navigation }) {
  const textRef = useRef(null);
  const myRef = useRef(null);

  const [productName, setProductName] = useState("");
  const [productTag, setProductTag] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [uploadUri, setUploadUri] = useState([]);
  const [price, setPrice] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const { navigate, addListener } = useNavigation();
  const [gotUrl, setGotUrl] = useState();
  const [image, setImage] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [blob, setBlob] = useState();
  const [imageUrls, setImagesUrls] = useState(["ss", "ww", "ss"]);
  const [transferred, setTransferred] = useState(0);
  //get permission for camera and albums in begining

  useLayoutEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    setIsSubmited(false);
  }, []);

  //open image library on upload image button
  async function getImageLibrary() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0,
      });

      if (!result.cancelled) {
        setGotUrl(result.uri);
        setUploadUri([...uploadUri, result.uri]);
        uploadToFirebase(result.uri);
      }
    } catch (err) {
      return err;
    }
  }

  //open camera roll on take photo button
  async function openCmeraRoll() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUploadUri([...uploadUri, result.uri]);
    }
  }

  //upload to firebase
  const uploadToFirebase = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ rotate: 0 }, { resize: { height: 300, width: 300 } }],
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
    );

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", manipResult.uri, true);
      xhr.send(null);
    });
    console.log("blob", blob);
    const filename = manipResult.uri.substring(
      manipResult.uri.lastIndexOf("/") + 1
    );
    setTransferred(0);
    const metadata = {
      contentType: "image/jpeg",
      cacheControl: "public,max-age=300",
      size: 20,
    };

    const ref = await firebase.storage().ref(`images/${filename}`);

    await ref.put(blob, metadata);

    const gotUrl = await firebase
      .storage()
      .ref()
      .child(`images/${filename}`)
      .getDownloadURL();

    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      var blob = xhr.response;
    };
    const Urls = ["wssd", "ee", "ww"];
    xhr.open("GET", gotUrl);
    xhr.send();
    Urls.splice(0, 1, gotUrl);
    imageUrls.pop();
    setImagesUrls([gotUrl, ...imageUrls]);

    setImage(null);
  };

  async function set_On_Db() {
    try {
      const collection = firebase.firestore().collection("products");
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      if (imageUrls[0]) {
        await collection.add({
          text: productName,
          tag: productTag,
          createdAt: timestamp,
          price,
          description,
          category: "",
          user: "",
          images: imageUrls,
        });
      }
    } catch (err) {
      return err;
    } finally {
      setUploadUri([]);

      navigate("Home");
      setIsSubmited(false);
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScrollView
      scrollEventThrottle={5}
      onScroll={() => Keyboard.dismiss()}
      style={{
        backgroundColor: "#a9a9a9",
        height: Dimensions.get("screen").height,
      }}>
      {!isSubmited ? (
        <View style={styles.container}>
          <View style={{ alignSelf: "center", bottom: 28 }}>
            <Text style={{ fontSize: 22 }}>Ny annonse</Text>
          </View>
          <View style={styles.dropDown_container}>
            <SellDropdown setCategory={setCategory} />
          </View>
          <View style={{ alignSelf: "center" }}>
            <DissmissKeyboard>
              <View style={{ alignSelf: "center" }}>
                <View style={styles.inputViews}>
                  <Text style={[styles.inputsdescriptions]}>Product Name</Text>
                  <TextInput
                    autoCorrect={false}
                    onChangeText={(texg) => setProductName(texg)}
                    style={styles.inputs}
                    placeholder="subject"></TextInput>
                </View>

                <View style={styles.inputViews}>
                  <Text style={[styles.inputsdescriptions]}>tag name</Text>
                  <TextInput
                    ref={myRef}
                    onChangeText={(texg) => setProductTag(texg)}
                    style={styles.inputs}
                    placeholder="tag"></TextInput>
                  <View style={{ marginTop: 22 }}>
                    <Text style={[styles.inputsdescriptions]}>Price</Text>
                    <TextInput
                      ref={myRef}
                      onChangeText={(texg) => setPrice(texg)}
                      style={styles.inputs}
                      placeholder="price"></TextInput>
                  </View>
                </View>
                <View style={styles.inputViews}>
                  <Text style={[styles.inputsdescriptions]}>Description</Text>
                  <TextInput
                    clearButtonMode="always"
                    multiline={true}
                    onChangeText={(texg) => setDescription(texg)}
                    style={[styles.inputs, { height: 166 }]}
                    placeholder="description"></TextInput>
                </View>
              </View>
            </DissmissKeyboard>
            <View>
              <TouchableOpacity
                style={styles.imagescroll}
                onPress={getImageLibrary}>
                <Text style={styles.uploadsubject}>Upload Image</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.imagescroll}
                onPress={openCmeraRoll}>
                <Text style={styles.uploadsubject}>Take Photo</Text>
              </TouchableOpacity>

              <View>
                <ScrollView style={{ flexDirection: "row" }} horizontal>
                  <ImageView uploadUri={uploadUri} imageUrls={imageUrls} />
                </ScrollView>

                <TouchableOpacity
                  title="submit"
                  style={styles.submit}
                  onPress={set_On_Db}>
                  <Text style={styles.submit_button}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </ScrollView>
  );
}

//screen uploaded image to user for confirmation befor uploadin
const ImageView = ({ uploadUri, imageUrls }) => {
  const [isLoaded, setLoad] = useState(true);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: 400,
        paddingHorizontal: 22,
        marginTop: 12,
      }}>
      {imageUrls?.map((res) => {
        return (
          <View
            key={Math.random()}
            style={{
              height: 100,
              width: 100,
              borderColor: "black",
              borderWidth: 6,
              marginHorizontal: 10,
            }}>
            {res?.length > 5 ? (
              <Image
                loadingIndicatorSource={require("../assets/favicon.png")}
                defaultSource={require("../assets/aaa.jpg")}
                onLoadStart={() => setLoad(false)}
                source={
                  res?.length > 5
                    ? Platform.OS === "ios"
                      ? { uri: res }
                      : res
                    : require("../assets/favicon.png")
                }
                style={styles.image_view}></Image>
            ) : (
              <Image
                loadingIndicatorSource={require("../assets/favicon.png")}
                defaultSource={require("../assets/aaa.jpg")}
                onLoadStart={() => setLoad(false)}
                source={require("../assets/favicon.png")}
                style={{
                  height: 50,
                  width: 50,
                  alignSelf: "center",
                }}></Image>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 74,
  },
  dropDown_container: {
    alignItems: "center",
    alignSelf: "center",

    width: 200,
    height: 50,
    borderRadius: 12,

    marginVertical: 22,
  },
  imagescroll: {
    marginTop: 9,
    width: 400,
  },
  uploadsubject: {
    width: 300,
    minWidth: 300,
  },
  submit_button: {
    paddingVertical: 7,
    width: 225,
    textAlign: "center",
    fontSize: 18,
    alignSelf: "center",
  },
  image_view: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderRadius: 9,
    borderColor: "black",
    borderWidth: 3,
  },
  uploadsubject: {
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  inputs: {
    borderRadius: 7,
    width: 300,
    borderColor: "#000",
    borderWidth: 0.5,
    color: "black",
    includeFontPadding: true,
    paddingVertical: 12,
    paddingHorizontal: 6,
    backgroundColor: "#708090",
  },
  submit: {
    backgroundColor: "red",
    marginTop: 22,
    borderColor: "rgb(255, 255, 255)",
    borderWidth: 1,
    alignSelf: "center",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 2.84,
    elevation: 5,
    borderRadius: 4,
  },
  photoupload: {
    borderColor: "black",
    borderRadius: 5,
    maxWidth: 200,
    backgroundColor: "#B7989188",
    shadowColor: "#000",
    height: 32,

    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.7,
    shadowRadius: 2.84,
    elevation: 5,
    marginTop: 12,
    alignSelf: "center",
    paddingHorizontal: 9,
    textAlign: "center",
    color: "red",
  },
  inputViews: {
    flexDirection: "column",
    marginRight: 22,
    paddingVertical: 4,
    marginVertical: 1,
  },
  inputsdescriptions: {
    fontSize: 18,
    marginBottom: 3,
    paddingBottom: 5,
  },
});

const DissmissKeyboard = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

function SellDropdown({ setCategory }) {
  const [dropdownValue, setDropdownValue] = useState("");
  const [selected, setSelected] = useState("");
  const items = [
    { label: "Football", value: "football", key: 1 },
    { label: "Baseball", value: "baseball", key: 2 },
    { label: "Hockey", value: "hockey", key: 3 },
  ];

  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 16,
      }}>
      <RNPickerSelect
        style={{ modalViewBottom: { backgroundColor: "#B7989188" } }}
        onValueChange={(value) => {
          setDropdownValue(value);
        }}
        textInputProps={{ accessibilityLabel: "kk" }}
        placeholder={{
          key: Math.random(),
          value: dropdownValue,
        }}
        onClose={() => setCategory(dropdownValue)}
        pickerProps={{
          accessibilityLabel: dropdownValue,
        }}
        value={items}
        doneText="select"
        useNativeAndroidPickerStyle={false}
        items={items}>
        <Text
          style={{
            color: "black",
            paddingVertical: 15,
            alignSelf: "center",
            backgroundColor: "#B7989188",
            width: 166,
            marginHorizontal: 44,
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 54,
            borderRadius: 18,
          }}>
          {dropdownValue}
        </Text>
      </RNPickerSelect>
    </View>
  );
}

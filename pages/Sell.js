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
  const [image, setImage] = useState();
  const { user } = useSelector((state) => state.auth);
  const [blob, setBlob] = useState();

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
    // ref.getDownloadURL().then(res=>res && axios.get(res).then(res=>setUploadUri(res.data)))
    setIsSubmited(false);
  }, []);

  //open image library on upload image button
  async function getImageLibrary() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setUploadUri([...uploadUri, result.uri]);
      setImage(result);
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
    setImage(result.uri);
  }

  //create blob for sending to firebase database
  async function getBlob() {
    const rr = image;
    const obj = { hello: "world" };
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json",
    });
    setBlob(blob);
  }

  //upload to firebase
  const uploadToFirebase = async () => {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    setUploading(true);
    setTransferred(0);
    const task = firebase.storage().ref(filename).putFile(uploadUri);
    // set progress state
    task.on("state_changed", (snapshot) => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      "Photo uploaded!",
      "Your photo has been uploaded to Firebase Cloud Storage!"
    );
    setImage(null);
  };

  function set_On_Db() {
    fireActions.setSellItem(
      category,
      productName,
      productTag,
      description,
      uploadUri,
      price,
      user
    );

    uploadToFirebase(blob);
    setUploadUri([]);

    setIsSubmited(true);
    setTimeout(() => {
      navigate("Sell");
      setIsSubmited(false);
    }, 1000);
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
                  <ImageView uploadUri={uploadUri} />
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
const ImageView = ({ uploadUri }) => {
  return (
    <>
      {uploadUri
        ? uploadUri.map((res) => {
            return (
              <Image
                key={Math.random()}
                source={Platform.OS === "ios" ? { uri: res } : res}
                style={styles.image_view}></Image>
            );
          })
        : uploadUri.map((res) => (
            <Icon
              key={Math.random()}
              style={{ paddingHorizontal: 33 }}
              name="feather"></Icon>
          ))}
    </>
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
    marginTop: 14,
    marginHorizontal: 9,
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

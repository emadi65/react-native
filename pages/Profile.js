import {
  useNavigation,
  useRoute,
  useLinkProps,
} from "@react-navigation/native";
import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { SafeAreaView } from "react-native";
import { Button } from "react-native";
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Keyboard,
  ScrollView,
} from "react-native";
import { Image } from "react-native-elements";
import firebase from "../firebase";
import useProduct from "./hooks/useProduct";
import FastImage from "react-native-fast-image";

const Item = ({ title, header, images, datee, price, id, description }) => {
  const imageref = useRef();
  const navigation = useNavigation();
  const router = useRoute();

  return (
    <View horizontal emi="emi" style={styles.item}>
      <View>
        <ScrollView
          horizontal
          scrollEventThrottle="88"
          style={{
            borderColor: "#2f4f4f",
            borderWidth: 3,
          }}>
          {images?.map((uri, index) => {
            return (
              <View
                key={Math.random()}
                style={{
                  display: "flex",
                  flex: 1,
                }}>
                <FastImage
                  resizeMethod="auto"
                  resizeMode="contain"
                  source={
                    Platform.OS === "ios"
                      ? { uri: uri, cache: "force-cache" }
                      : uri
                  }
                  ref={imageref}
                  style={{
                    width: 300,
                    height: 250,

                    marginHorizontal: 7,
                    marginVertical: 4,
                    marginLeft: 12,
                  }}></FastImage>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <SafeAreaView
        style={{ marginLeft: 22, marginTop: 55, flexDirection: "row" }}>
        <Text style={{ fontSize: 18, color: "white" }}>{header}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{description}</Text>
      </SafeAreaView>
    </View>
  );
};

const Profile = ({ navigation, route }) => {
  const router = useRoute();
  const navig = useNavigation();
  const [title, setTitle] = useState("");
  const [products, setProductName] = useState([]);
  const [query, setQuey] = useState();
  const [gotProducts, setInput] = useProduct();

  useEffect(() => {
    if (route.params) {
      setQuey(route.params?.header);
      navig.setOptions({ title: route.params?.header });
      setInput(route.params?.header);
    }
  }, []);

  const renderItem = ({ item }) => (
    <Item
      title={item.tag}
      header={item.text}
      images={item.images}
      price={item.price}
      description={item.description}
      id={item.id}
      datee={
        item.createdAt
          ? new Date(item.createdAt.seconds * 1000).toLocaleDateString("eur")
          : ""
      }
    />
  );

  return (
    <View>
      <FlatList
        scrollEventThrottle={88}
        data={gotProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{
          borderColor: "black",
          borderWidth: 3,
          height: "100%",
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  imageRef: {
    alignSelf: "flex-start",
  },
  submit: {
    borderWidth: 1,
    borderColor: "black",
    height: 35,
    width: 100,
    borderRadius: 12,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    marginLeft: 184,
  },
  item: {
    backgroundColor: "#B9D1DF",
    borderRadius: 5,
    flex: 1,
    alignItems: "stretch",
    borderColor: "#A4B0B0",
    borderWidth: 3,

    width: Dimensions.get("screen").width,
    paddingVertical: 22,
    right: 14,

    height: Dimensions.get("screen").height,
    marginBottom: 33,
  },
  title: {
    color: "white",
  },
});

export default Profile;

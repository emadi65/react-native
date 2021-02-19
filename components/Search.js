import React, { useRef, useEffect, useState } from "react";
import { Keyboard, ActivityIndicator } from "react-native";
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import firebase from "../firebase";
import Icon from "react-native-vector-icons/AntDesign";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { get_all_products } from "../redux/actions/FireActions";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../redux/actions/authActions";
import isEmpty from "is-empty";
import { Filter } from "../components/filters/Filter";
import { SafeAreaView } from "react-native";
import Lottie from "lottie-react-native";
import CachedImage from "react-native-expo-cached-image";

const Item = ({ title, header, datee, price, images }) => {
  const dispatch = useDispatch();

  const imageref = useRef();
  const navigation = useNavigation();
  const [uu, setuu] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRoute();

  return (
    <ScrollView emi="emi" style={styles.item} scrollEventThrottle={80}>
      {title ? (
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => {
            navigation.navigate("Profile", {
              screen: "Profile",
              header: header,
            });
          }}>
          {images ? (
            <CachedImage
              ref={imageref}
              height={300}
              width={300}
              resizeMode="cover"
              importantForAccessibility="auto"
              loadingIndicatorSource={require("../assets/favicon.png")}
              resizeMethod="auto"
              defaultSource={require("../assets/favicon.png")}
              source={(images[0], { uri: images[0], cache: "reload" })}
              style={styles.imageRef}></CachedImage>
          ) : null}

          <View style={{ marginLeft: 22 }}>
            <Text style={styles.Title_header}>{header}</Text>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.view_createdatt}>
              <Text style={styles.price}>{price}</Text>
              <Text style={{ marginLeft: 34 }}>
                {`Created at 
        ${datee.toString()}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View>
          <ActivityIndicator style={{ marginVertical: 99 }} />
          <ActivityIndicator size="large" />
          <ActivityIndicator size="small" color="#0000ff" />
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </ScrollView>
  );
};

export default function Search() {
  const Route = useRoute();
  const textRef = useRef();
  let ee = useRef();

  const [products, setProductName] = useState([]);

  const [input, setInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [categoryObj, setCategoryObj] = useState("");
  const dispatch = useDispatch();
  const fire = get_all_products(dispatch);
  const { possible, categorys, allGotProducts, all } = useSelector(
    (state) => state.auth
  );
  const { firebase_error } = useSelector((state) => state.errorState);
  const [loaded, setLoaded] = useState(false);
  const flatListRef = useRef();
  const { navigate } = useNavigation();
  const [filterCount, setFilterCount] = useState();

  useEffect(() => {
    SolveProduct(input);
    console.log(categoryObj);
  }, [categoryObj]);

  useEffect(() => {
    SolveProduct(input);
    setSearchInput(input);
  }, [input]);

  const renderItem = ({ item }) => (
    <Item
      title={item.tag}
      header={item.text}
      images={item.images}
      price={item.price}
      category={item.category}
      datee={
        item.createdAt
          ? new Date(item.createdAt.seconds * 1000).toLocaleDateString("eur")
          : ""
      }
    />
  );

  async function SolveProduct(input_text) {
    try {
      const collection = firebase.firestore().collection("products");
      if (categoryObj) {
        collection.onSnapshot(
          (querySnapshot) => {
            const newEntities = [];

            querySnapshot.forEach((doc) => {
              const entity = doc.data();
              entity.id = doc.id;
              newEntities.push(entity);
            });

            const my = newEntities.filter((value) => {
              return value.category?.includes(categoryObj);
            });

            const data = [];
            my.map((res) => {
              if (res.text?.includes(input_text)) {
                data.push(res);
              }
            });
            setProductName(data);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        collection.onSnapshot(
          (querySnapshot) => {
            const newEntities = [];

            querySnapshot.forEach((doc) => {
              const entity = doc.data();
              entity.id = doc.id;
              newEntities.push(entity);
            });
            const data = [];
            newEntities.map((res) => {
              if (res.text?.includes(input_text)) {
                data.push(res);
              }
            });
            setProductName(data);
            setLoaded(true);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } catch (err) {
      return err;
    }
  }
  return (
    <View style={{ width: "100%" }}>
      <View style={styles.flatlist_container}>
        <View style={styles.flatlist_container_view1}>
          <Icon
            name="search1"
            size={30}
            color="#f0ffff"
            style={styles.search_icon}
          />
        </View>
        <View style={{ width: "68%", borderRadius: 15 }}>
          <TextInput
            ref={ee}
            style={styles.textInput}
            onEndEditing={() => Keyboard.dismiss()}
            value={input}
            placeholder="Search Product"
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={(text) => {
              SolveProduct(text), setInput(text);
            }}></TextInput>

          <FlatList
            onScrollBeginDrag={() => {
              Keyboard.dismiss();
            }}
            ref={flatListRef}
            data={isEmpty(input) ? null : products}
            renderItem={(item) => (
              <View
                style={{ justifyContent: "center" }}
                onTouchStart={(e) => {
                  flatListRef.current.setNativeProps({
                    style: { height: 0, width: 0 },
                  });
                }}
                onTouchEnd={() => setInput(item.item.text)}>
                <Text
                  ref={textRef}
                  style={{
                    marginVertical: 8,
                    fontWeight: "500",

                    backgroundColor: "#f0ffff44",
                    borderRadius: 9,
                    borderColor: "black",
                    borderWidth: 1,
                    lineHeight: 34,

                    fontSize: 18,
                    letterSpacing: 0.1,
                    paddingLeft: 22,
                  }}>
                  {item.item.text}
                </Text>
              </View>
            )}
            key={Math.random()}
            style={{
              width: 400,

              right: -22,
              maxHeight: 230,
              left: -66,
              top: 44,
              paddingTop: 22,
              position: "absolute",
            }}
          />
        </View>

        <Filter
          setFilterCount={setFilterCount}
          filterCount={filterCount}
          setCategory={setCategoryObj}
        />
      </View>
      {loaded ? (
        <FlatList
          onScrollBeginDrag={() => {
            Keyboard.dismiss();
          }}
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          key={Math.random()}
          style={styles.flatList}
        />
      ) : (
        <View style={{ marginTop: 88 }}>
          <Text
            style={{
              alignSelf: "center",
              letterSpacing: 12,
              left: 22,
              fontWeight: "700",
            }}>
            Loading...
          </Text>
          <View style={{ justifyContent: "center" }}>
            <Lottie
              style={{
                height: 300,
                width: Dimensions.get("screen").width,
                alignSelf: "center",
                top: 44,
              }}
              autoPlay
              loop={false}
              source={require("../assets/42407-spinner.json")}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    alignItems: "flex-end",
    height: "100%",
    width: "94%",
  },
  filter_button: {
    width: 64,
    height: "100%",
    alignSelf: "center",
    right: 16,
    flexDirection: "row",
    bottom: 12,
  },
  filter_text: {
    paddingVertical: 3,
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    textAlignVertical: "center",
    top: 12,
    textDecorationLine: "underline",
  },
  flatList: {
    borderColor: "black",
    borderWidth: 3,
    height: "76%",
    zIndex: -1,
  },
  filter_icon: {
    opacity: 0.7,
    height: "100%",
    paddingTop: 20,
  },
  flatlist_container: {
    flexDirection: "row",
    height: 50,
    display: "flex",
    borderWidth: 2,
    backgroundColor: "#B9D1DF",
    borderColor: "black",
    borderRadius: 5,
    width: "96%",
    left: 10,
    marginVertical: 6,
    alignSelf: "flex-start",
  },
  flatlist_container_view1: {
    alignSelf: "flex-start",
    backgroundColor: "#C6D4D355",
    height: "100%",
    paddingHorizontal: 4,
  },
  price: {
    color: "green",
    marginTop: 22,
  },
  search_icon: {
    opacity: 0.7,
    height: "100%",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  view_createdatt: {
    marginTop: "auto",
    flexDirection: "row",
    display: "flex",
  },
  imageRef: {
    alignSelf: "flex-start",
    width: 200,
    height: 160,
  },
  Title_header: {
    fontSize: 18,
    color: "white",
    width: 150,
  },
  submit: {
    borderWidth: 1,
    borderColor: "black",
    height: 35,
    top: 6,
    width: 100,
    borderRadius: 12,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    marginLeft: 184,
  },
  item: {
    backgroundColor: "#B9D1DF",
    borderRadius: 5,
    marginHorizontal: 16,
    borderColor: "#A4B0B0",
    borderWidth: 3,
    marginVertical: 2,
    width: Dimensions.get("screen").width,
    paddingVertical: 8,
    right: 15,
  },
  title: {
    color: "white",
  },
});

import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  createRef,
} from "react";
import firebase from "../firebase";
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  StatusBar,
  View,
  VirtualizedList,
  TextInput,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Search from "../components/Search";
import * as authActions from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react-native";
import * as fireActions from "../redux/actions/FireActions";

export default function Shop({ navigation, route }) {
  const mref = useRef();
  const [data, setData] = useState();
  const [product, setProductName] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const db = firebase.firestore();
  const dispatch = useDispatch();
  const getallProducts = fireActions.get_all_products(dispatch);
  const { allGotProducts, categorys, possible } = useSelector(
    (state) => state.auth
  );

  return (
    <View
      ref={mref}
      style={{
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
      }}>
      {loaded ? (
        <Search navigation={navigation} setti={setLoaded} />
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
  container: {
    width: Dimensions.get("screen").width,
    marginTop: StatusBar.currentHeight || 0,
  },
});

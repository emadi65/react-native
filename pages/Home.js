import "react-native-gesture-handler";
import React ,{useEffect} from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import Shop from "./Shop";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import * as authActions from "../redux/actions/authActions";
import InsetShadow from "react-native-inset-shadow";

export default function Home({ route }) {
  const dispatch = useDispatch();
const {categorys} = useSelector(state => state.auth)
  const logout = authActions.logOut(dispatch);
  useEffect(() => {
    console.log(categorys?.name)
    }, [categorys?.name])
  return (
    <View style={styles.container}>
      <Header logout={logout} />

      <View>
        <Shop />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});

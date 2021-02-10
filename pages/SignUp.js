import React, { useState, useRef } from "react";
import { Button } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../firebase";
import * as authActions from "../redux/actions/authActions";
import isEmpty from "is-empty";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as fireActions from "../redux/actions/FireActions";

export default function Login({ navigation }) {
  const [username, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [secoundPass, setSecoundPass] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [gotUser, setGotUser] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { sign_user, user, created_user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const signuser = authActions.getUser(dispatch);
  const setOnFirebase = fireActions.set_User_Db(dispatch);
  const { signup_error } = useSelector((state) => state.errorState);
  const { navigate } = useNavigation();
  const userRef = useRef();
  const passRef = useRef();

  const submitForm = () => {
    signuser(username, pass, displayName);
    setOnFirebase(username, phoneNumber, displayName);
    if (created_user) {
      userRef.current.setNativeProps({ text: "" });
      passRef.current.setNativeProps({ text: "" });
    }
  };

  return (
    <View style={styles.inputViews}>
      <Item login="Signup please"></Item>
      <Input
        textContentType="emailAddress"
        ref={userRef}
        placeholder="Username"
        onChangeText={(text) => {
          setUser(text), dispatch({ type: "SIGNUP_ERROR", payload: null });
        }}></Input>
      <Input
        textContentType="password"
        ref={passRef}
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(text) => setPass(text)}></Input>
      <Input
        textContentType="password"
        secureTextEntry={true}
        placeholder="Repeat pass"
        onChangeText={(text) => setSecoundPass(text)}></Input>
      <Input
        textContentType="telephoneNumber"
        placeholder="Phone number"
        onChangeText={(text) => setPhone(text)}></Input>
      <Input
        textContentType="nickname"
        placeholder="Diplay Name"
        onChangeText={(text) => setDisplayName(text)}></Input>
      <View>
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => {
            navigate("Login");
          }}>
          <Text style={styles.redirect_to_login_text}>
            Do you alredy have a account?
          </Text>
        </TouchableOpacity>
      </View>
      <Button onPress={submitForm} title="submit"></Button>
      {isEmpty(signup_error) ? (
        <Text style={{ alignSelf: "center" }}>{user ? "Done" : ""}</Text>
      ) : (
        <Text style={{ alignSelf: "center" }}>{signup_error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputViews: {
    marginBottom: "auto",
    marginTop: 44,
  },
  item: {
    marginHorizontal: 22,
    marginVertical: 22,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
  },
  redirect_to_login_text: {
    color: "blue",
    textDecorationLine: "underline",
  },
  submit: {
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    width: 200,
  },
});

const Item = ({ login }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{login}</Text>
  </View>
);

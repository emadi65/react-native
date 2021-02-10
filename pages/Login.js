import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";
import { Button } from "react-native";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../firebase";
import * as authActions from "../redux/actions/authActions";
import isEmpty from "is-empty";

export default function Login({ navigation, route }) {
  const [username, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [gotUser, setGotUser] = useState();
  const [loading, setLoading] = useState(false);
  const { loginError } = useSelector((state) => state.errorState);
  const { user, sign_user, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const getuser = authActions.signUser(dispatch);
  const userRef = useRef();
  const passRef = useRef();

  useEffect(() => {
    dispatch({ type: "LOGIN_ERROR", payload: "" });
  }, []);
  const submitForm = () => {
    getuser(username, pass);
    if (sign_user) {
      userRef.current.setNativeProps({ text: "" });
      passRef.current.setNativeProps({ text: "" });
    }
  };

  return (
    <View style={styles.inputViews}>
      <Item login="Login"></Item>
      <Input
        ref={userRef}
        textContentType="emailAddress"
        placeholder="username"
        onChangeText={(text) => {
          setUser(text),
            isEmpty(text) && dispatch({ type: "LOGIN_ERROR", payload: "" });
        }}></Input>
      <Input
        ref={passRef}
        placeholder="password"
        textContentType="password"
        passwordRules="required:true"
        secureTextEntry={true}
        onChangeText={(text) => {
          setPass(text),
            isEmpty(text) && dispatch({ type: "LOGIN_ERROR", payload: "" });
        }}></Input>
      {!loading ? (
        <View
          style={{
            height: 44,
            width: "100%",

            alignSelf: "center",
          }}>
          {isEmpty(loginError) ? (
            <Text></Text>
          ) : (
            <Text style={{ alignSelf: "center" }}>{loginError}</Text>
          )}
        </View>
      ) : (
        <ActivityIndicator />
      )}

      <Button onPress={submitForm} title="submit"></Button>
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

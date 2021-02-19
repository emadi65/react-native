import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { logOut } from "../redux/actions/authActions";
import Setting from "../components/Setting";

const Header = ({ navigation, logout }) => {
  const [userEmail, setUseremail] = useState(false);
  const { navigate } = useNavigation();
  const { user } = useSelector((state) => state.auth);

  return (
    <View style={styles.header_container}>
      <View
        style={{
          flex: 4,
          borderRadius: 58,

          justifyContent: "center",
          alignContent: "flex-start",
          maxWidth: 170,
          right: 5,
        }}>
        {user ? (
          <Text
            style={{
              paddingVertical: 2,
              borderRadius: 5,
              alignSelf: "center",
              color: "#2f4f4f",
              fontWeight: "700",
            }}>
            {user.email}
          </Text>
        ) : (
          <Text></Text>
        )}
      </View>
      <View style={{ position: "absolute", paddingTop: 18 }}>
        <Text style={styles.appName_Text}>Snusk</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
          marginEnd: 4,
        }}>
        <Setting />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    width: "100%",
    height: 90,
    paddingTop: 42,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#c0c0c0",
    zIndex: 1,
  },
  appName_Text: {
    color: "#C6D9D7",
    alignSelf: "center",
    height: 44,
    width: 50,
    fontWeight: "900",
    lineHeight: 58,
    left: 10,
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
});
export default Header;

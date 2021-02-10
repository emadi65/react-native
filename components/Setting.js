import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/Feather";

import Icon1 from "react-native-vector-icons/AntDesign";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import * as authActions from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import InsetShadow from "react-native-inset-shadow";

const Setting = () => {
  const [openedDrawer, setOpendDrawer] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const signOut = authActions.logOut(dispatch);
  const { navigate } = useNavigation();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <Icon
        title="setting"
        name="settings"
        style={{
          top: 12,
        }}
        size={25}
        suppressHighlighting={true}
        color="#2f4f4f"
        onPress={toggleModal}></Icon>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignSelf: "center",
        }}>
        <Modal
          animationIn="zoomIn"
          animationOut="zoomOut"
          backdropOpacity={0.5}
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={{
            backgroundColor: "#708090",
            borderRadius: 22,
          }}
          onBackButtonPress={toggleModal}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              paddingTop: 44,

              alignContent: "center",
            }}>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 22,
                textDecorationLine: "underline",
                marginBottom: 22,
                letterSpacing: 2,
              }}>
              Setting
            </Text>
            <View style={styles.button_view}>
              <TouchableOpacity
                onPress={signOut}
                color="#696969"
                title="Logout">
                <Text style={styles.button_text}>Contact</Text>
              </TouchableOpacity>
              <Icon1
                style={{ alignSelf: "center" }}
                title="contacts"
                name="contacts"
                size={25}
                color="#191970"
              />
            </View>

            <View style={styles.button_view}>
              <TouchableOpacity color="#696969" title="Logout">
                <Text style={styles.button_text}>Profile</Text>
              </TouchableOpacity>
              <Icon1
                style={{ alignSelf: "center" }}
                title="profile"
                name="profile"
                size={25}
                color="#191970"
              />
            </View>

            <View style={styles.button_view}>
              <TouchableOpacity
                onPress={signOut}
                color="#696969"
                title="Logout">
                <Text style={styles.button_text}>Logout</Text>
              </TouchableOpacity>
              <Icon1
                style={{ alignSelf: "center" }}
                title="logout"
                name="logout"
                size={25}
                color="#191970"
              />
            </View>
            <View style={{ height: 150 }}></View>
            <Icon1
              onPress={toggleModal}
              style={{ paddingTop: 44, alignSelf: "center" }}
              title="close"
              name="closecircle"
              size={25}
              color="#000080"
              onPress={toggleModal}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button_view: {
    fontSize: 12,
    marginVertical: 10,
    marginHorizontal: 22,
    alignSelf: "center",
    color: "black",
    backgroundColor: "#e6e6fa",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "black",
    height: "5%",
    width: "80%",
    textDecorationLine: "underline",
    borderRadius: 12,
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: { height: 6, width: 3 },
  },
  button_text: {
    fontWeight: "700",
    color: "#483d8b",
  },
  button_icon: {
    alignSelf: "center",
  },
  view: {
    shadowColor: "black",
    shadowOffset: { height: 3, width: 3 },
    shadowRadius: 3,

    height: "110%",
    width: "110%",
  },
});
export default Setting;

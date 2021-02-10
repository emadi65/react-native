import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import InsetShadow from "react-native-inset-shadow";
import Icon from "react-native-vector-icons/Feather";

import Icon1 from "react-native-vector-icons/AntDesign";
import Modal from "react-native-modal";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as authActions from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { Dimensions } from "react-native";
import { Input } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";

export default function FilterModal1({ loading, setloading }) {
  const [openedDrawer, setOpendDrawer] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModal1Visible, setModal1Visible] = useState(false);
  const dispatch = useDispatch();
  const signOut = authActions.logOut(dispatch);
  const { navigate } = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}>
      <InsetShadow
        shadowColor="black"
        shadowOffset={1}
        shadowRadius={3}
        shadowOpacity={1}>
        <TouchableOpacity onPress={toggleModal}>
          <View
            style={{
              flexDirection: "row-reverse",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
              alignSelf: "center",
              alignContent: "space-around",
              borderRadius: 8,
            }}>
            <Icon1 title="right" name="right" size={24} color="#191970" />
            <Text
              style={{
                alignSelf: "center",
                marginRight: 92,
                borderBottomWidth: 1,
                borderBottomColor: "black",
                borderBottomStartRadius: 2,
                borderBottomEndRadius: 2,
              }}>
              Category...
            </Text>
          </View>
          <View style={{ width: Dimensions.get("screen").width }}>
            <Modal
              animationIn="slideInRight"
              animationOut="slideOutDown"
              backdropOpacity={0.5}
              isVisible={isModalVisible}
              transparent={true}
              style={{
                backgroundColor: "#708090",
                borderRadius: 22,
                marginHorizontal: 44,
                marginVertical: 88,
              }}
              onBackdropPress={toggleModal}>
              <InsetShadow>
                <View style={styles.filter_label}>
                  <SellDropdown />
                </View>
              </InsetShadow>
            </Modal>
          </View>
        </TouchableOpacity>
      </InsetShadow>
    </View>
  );
}
function SellDropdown() {
  const [dropdownValue, setDropdownValue] = useState();
  const [selected, setSelected] = useState("");
  const items = [
    { label: "Football", value: "football", key: 1 },
    { label: "Baseball", value: "baseball", key: 2 },
    { label: "Hockey", value: "hockey", key: 3 },
  ];
  useEffect(() => {
    if (!dropdownValue) setDropdownValue("Category...");
  }, [dropdownValue]);
  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 16,
      }}>
      <RNPickerSelect
        style={{
          modalViewBottom: { backgroundColor: "#B79891" },
          viewContainer: { borderRadius: 9 },
        }}
        onValueChange={(value) => {
          setDropdownValue(value);
        }}
        textInputProps={{ accessibilityLabel: "kk" }}
        placeholder={{
          key: Math.random(),
          value: dropdownValue ?? "Ctaegory...",
        }}
        pickerProps={{
          accessibilityLabel: dropdownValue,
        }}
        value={items}
        doneText="select"
        useNativeAndroidPickerStyle={false}
        items={items}>
        <View
          style={{
            borderRadius: 18,
            backgroundColor: "#B79891",
            shadowColor: "black",
            shadowOffset: { height: 3, width: 3 },
            shadowOpacity: 0.6,
            shadowRadius: 2,
            width: 200,
            alignSelf: "center",
          }}>
          <Text
            style={{
              color: "black",
              paddingVertical: 15,
              alignSelf: "center",

              justifyContent: "center",
              alignItems: "center",
            }}>
            {dropdownValue}
          </Text>
        </View>
      </RNPickerSelect>
    </View>
  );
}

const styles = StyleSheet.create({
  button_view: {
    fontSize: 12,
    marginVertical: 10,
    marginHorizontal: 22,
    alignSelf: "center",
    color: "black",

    justifyContent: "space-around",
    alignItems: "center",

    shadowColor: "black",
    height: 70,
    width: 350,
    textDecorationLine: "underline",
    borderRadius: 8,
  },
  input_description: {
    marginBottom: 12,
  },
  Inputs: {
    alignSelf: "center",
  },

  filter_label: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 24,

    alignContent: "center",
  },
  icons: {
    alignSelf: "center",
    backgroundColor: "#e6e6fa",
  },
  input_container: {
    flexDirection: "row",
  },
  filter_icon: {
    opacity: 0.7,
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
  },
});

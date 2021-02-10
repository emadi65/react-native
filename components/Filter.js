import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/Feather";

import Icon1 from "react-native-vector-icons/AntDesign";
import Modal from "react-native-modal";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as authActions from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { Dimensions } from "react-native";

import RNPickerSelect from "react-native-picker-select";
import * as FireActions from "../redux/actions/FireActions";
import isEmpty from "is-empty";

export function Filter({
  loading,
  setloading,
  setFilterCount,
  filterCount,
  setCategory,
}) {
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const signOut = authActions.logOut(dispatch);
  const { navigate } = useNavigation();
  const [two, setTwo] = useState(true);
  const getCat = FireActions.setCategorys(dispatch);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View
      style={{
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}>
      <TouchableOpacity onPress={toggleModal}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            right: 12,
            top: 7,
          }}>
          <Text style={{ left: 6 }}>{filterCount} Filter </Text>

          <Icon
            name="filter"
            size={30}
            color="#000"
            style={styles.filter_icon}></Icon>
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

              marginVertical: 99,

              borderColor: "white",
              borderWidth: 3,
              overflow: "hidden",
              shadowColor: "black",
              shadowRadius: 10,
              shadowOpacity: 1,
              paddingTop: 74,
            }}
            onBackdropPress={toggleModal}>
            <View style={styles.filter_label}>
              <View
                onTouchStart={() => setTwo(true)}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 44,
                  alignSelf: "center",
                  marginVertical: 57,
                  paddingHorizontal: 88,
                  height: 64,
                  width: "100%",
                  borderRadius: 6,
                  shadowOpacity: 0.8,
                  shadowRadius: 3,
                  shadowOffset: { height: 3, width: 3 },
                  shadowColor: "black",
                }}>
                <View
                  style={{
                    alignSelf: "center",
                    paddingVertical: 6,
                    width: 300,
                  }}>
                  <SellDropdown
                    onpress={(value) => {
                      getCat(value), setFilterCount(1), setCategory(value);
                    }}
                    items={[
                      { label: "Football", value: "football", key: 1 },
                      { label: "Baseball", value: "baseball", key: 2 },
                      { label: "Hockey", value: "hockey", key: 3 },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.button_view}>
                <Button title="close" onPress={toggleModal}></Button>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
    </View>
  );
}
function SellDropdown({ items, onpress }) {
  const [dropdownValue, setDropdownValue] = useState(
    "select items category..."
  );
  const [selected, setSelected] = useState("");

  const rr = useCallback(() => {
    onpress(dropdownValue);
  }, [dropdownValue]);

  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 16,
        width: 300,
      }}>
      <RNPickerSelect
        style={{
          modalViewBottom: { backgroundColor: "#B79891" },
          viewContainer: { borderRadius: 9, width: 300 },
        }}
        onValueChange={(value) => {
          setDropdownValue(value);
        }}
        onClose={rr}
        placeholder={{
          key: Math.random(),
          value: dropdownValue,
        }}
        value={items}
        doneText="select"
        useNativeAndroidPickerStyle={false}
        items={items}>
        <View
          style={{
            borderRadius: 18,
            backgroundColor: "#a9a9a9",
            shadowColor: "black",
            shadowOffset: { height: 3, width: 3 },
            shadowOpacity: 0.6,
            shadowRadius: 2,
            width: 300,
            height: 48,
            alignItems: "baseline",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            paddingHorizontal: 22,
          }}>
          <Icon1
            name="down"
            size={25}
            color="#000"
            style={{ alignSelf: "center" }}></Icon1>
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
      <Button title="clear" onPress={() => onpress("")} />
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
    borderRadius: 1,
    shadowOpacity: 0.4,
    shadowRadius: 0.4,
    shadowOffset: { height: 1, width: 1 },
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

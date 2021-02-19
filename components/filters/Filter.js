import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Icon1 from "react-native-vector-icons/AntDesign";
import Modal from "react-native-modal";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as authActions from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { Dimensions } from "react-native";
import FilterModal1 from "./FilterModal2";
import { setCategorys } from "../../redux/actions/FireActions";

export function Filter({ setFilterCount, filterCount, setCategory }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const signOut = authActions.logOut(dispatch);
  const { navigate } = useNavigation();

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
            top: 77,
          }}>
          <Text style={{ left: 6 }}>{filterCount} Filter </Text>
          <Icon
            name="filter"
            size={30}
            color="#000"
            style={styles.filter_icon}></Icon>
        </View>
        <View style={{ width: Dimensions.get("screen").width }}>
          <FilterModal1
            isModalVisible={isModalVisible}
            toggleModal={toggleModal}
            setCategory={setCategory}
          />
        </View>
      </TouchableOpacity>
      <View>
        <Button
          title="to messages"
          onPress={() => navigate("Messages")}></Button>
      </View>
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

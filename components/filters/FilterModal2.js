import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import InsetShadow from "react-native-inset-shadow";
import Icon from "react-native-vector-icons/Feather";

import Icon1 from "react-native-vector-icons/AntDesign";
import Modal from "react-native-modal";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as authActions from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { Dimensions } from "react-native";
import { Input } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import Select_Category from "./Select_Category";
import * as FireActions from "../../redux/actions/FireActions";

export default function FilterModal1({
  isModalVisible,
  toggleModal,
  setCategory,
}) {
  const [openedDrawer, setOpendDrawer] = useState(false);

  const dispatch = useDispatch();
  const signOut = authActions.logOut(dispatch);
  const { navigate } = useNavigation();
  const getCat = FireActions.setCategorys(dispatch);

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
        <Modal
          animationIn="slideInRight"
          animationOut="slideOutDown"
          backdropOpacity={0.5}
          isVisible={isModalVisible}
          transparent={true}
          style={{
            backgroundColor: "#708090",
            borderRadius: 22,

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
            <View style={styles.button_view}>
              <Text>category...</Text>
            </View>
            <Select_Category
              onpress={setCategory}
              items={[
                { label: "football", value: "football", key: 2 },
                { label: "baseball", value: "baseball", key: 1 },
              ]}
            />
            <Button title="close" onPress={toggleModal}></Button>
          </View>
        </Modal>
      </InsetShadow>
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

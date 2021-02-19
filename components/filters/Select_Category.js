import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

import Icon1 from "react-native-vector-icons/AntDesign";

import RNPickerSelect from "react-native-picker-select";
import useCategory from "./hooks/useCategory";

function Select_Category({ items, onpress }) {
  const [dropdownValue, setDropdownValue] = useState(
    "select items category..."
  );
  const [selected, setSelected] = useState("");
  const [category, setCategory] = useCategory([]);
  const rr = useCallback(() => {
    onpress(dropdownValue);
  }, [dropdownValue]);

  return (
    <View
      style={{
        alignSelf: "center",
      }}>
      <View>
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
      </View>
      <View style={{ marginTop: 55 }}>
        <RNPickerSelect
          style={{
            modalViewBottom: { backgroundColor: "orange" },
            viewContainer: { borderRadius: 9, width: 300 },
            modalViewMiddle: { backgroundColor: "red" },
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
      </View>
      <View style={{ marginTop: 55 }}>
        <RNPickerSelect
          style={{
            modalViewBottom: { backgroundColor: "orange" },
            viewContainer: { borderRadius: 9, width: 300 },
            modalViewMiddle: { backgroundColor: "red" },
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
      </View>
      <Button title="clear" onPress={() => onpress("")} />
    </View>
  );
}

export default Select_Category;

const styles = StyleSheet.create({});

import React from "react";
import { Button } from "react-native";
import { StyleSheet, Text, View } from "react-native";

const FilterScreen = ({ navigation }) => {
  return (
    <View style={{ marginTop: 68, height: 600 }}>
      <Text>Filter Screen</Text>
      <Button
        title="select category"
        onPress={() => navigation.navigate("Category")}></Button>
      <Button
        title="close"
        onPress={() => navigation.navigate("Home")}></Button>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({});

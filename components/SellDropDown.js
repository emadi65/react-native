import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Picker from "@react-native-picker/picker";

export default function SellDropDown() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Picker
        // selectedValue={this.state.language}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) => console.log("value")}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
});

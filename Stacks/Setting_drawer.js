import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../pages/Home";
import Sell from "../pages/Sell";
import Filter from "../components/Filter";
const Drawer = createDrawerNavigator();

const Setting_drawer = () => {
  return (
    <View
      style={{
        height: 1800,
        width: 400,
        top: 466,
      }}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Filter" component={Filter} />
      </Drawer.Navigator>
    </View>
  );
};

export default Setting_drawer;

const styles = StyleSheet.create({});

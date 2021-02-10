import React from "react";
import { View, Text } from "react-native";
import FirstPageSvg from "../components/FirstPageSvg";
import { createStackNavigator } from "@react-navigation/stack";

import Signup from "../pages/SignUp";
import Login from "../pages/Login";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerTintColor: "blue", headerShown: false }}
        name="Signup"
        component={Signup}
      />
      <Stack.Screen
        options={{ headerTintColor: "blue" }}
        name="Login"
        component={Login}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

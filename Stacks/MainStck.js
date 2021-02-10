import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Sell from "../pages/Sell";
import Home from "../pages/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../pages/Profile";
import Mypage from "../pages/MyPage";
import firebase from "../firebase";
import * as authActions from "../redux/actions/authActions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FilterScreen from "../pages/FilterScreen";
import CategoryScreen from "../pages/CategoryScreen";

//create needed stacks
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStck = () => {
  const [loading, setLoading] = useState();

  //get data from redux store
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const getCurrent_user = authActions.getCurrentUser(dispatch);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        getCurrent_user(user);
      } else {
        // No user is signed in.
      }
    });
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
            color = "#db7093";
          } else if (route.name === "Sell") {
            iconName = focused ? "plus" : "plus";
            color = "#f08080";
          } else if (route.name === "Basket") {
            iconName = focused ? "shopping-outline" : "basket";
            color = "#cd853f";
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
      tabBarOptions={{ style: { backgroundColor: "#c0c0c0" } }}>
      <Tab.Screen name="Home" component={StackNav} />
      <Tab.Screen name="Sell" component={Sell} />
      <Tab.Screen name="Basket" component={Mypage} />
    </Tab.Navigator>
  );
};

function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerTintColor: "#20b2aa",
        }}
      />
      <Stack.Screen
        name="Filter"
        component={FilterScreen}
        options={{
          headerShown: true,
          headerTintColor: "#20b2aa",
          cardOverlayEnabled: true,

          animationTypeForReplace: "pop",
          safeAreaInsets: { top: 30, bottom: 70, left: 40, right: 40 },
          headerBackground: () => (
            <Image
              source={require("../assets/aaa.jpg")}
              style={{ height: 100, width: 600 }}></Image>
          ),
        }}
      />
      <Stack.Screen name="Category" component={CategoryScreen} />
    </Stack.Navigator>
  );
}

export default MainStck;

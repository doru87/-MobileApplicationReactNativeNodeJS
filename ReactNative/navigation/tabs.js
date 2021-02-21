import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import SearchProduct from "../Screens/SearchProduct";
import addToFavorites from "../Screens/addToFavorites";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          borderTopWidth: 0,
          backgroundColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/utensils-solid.svg")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#FC6D3F" : "#CDCDD2",
              }}
            />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Search"
        component={SearchProduct}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/search-solid.svg")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#FC6D3F" : "#CDCDD2",
              }}
            />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Like"
        component={addToFavorites}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/heart-solid.svg")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? "#FC6D3F" : "#CDCDD2",
              }}
            />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default Tabs;

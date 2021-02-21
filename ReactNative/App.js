import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Screens/Home";
import Menu from "./Screens/Menu";
import Tabs from "./navigation/tabs";
import adaugaMagazine from "./Screens/adaugaMagazine";
import Stripe from "./Screens/Stripe";
import CheckoutDetails from "./Screens/CheckoutDetails";
import adaugaCategorie from "./Screens/adaugaCategorie";
import ImageProvider from "./context/imageContext";
import adaugaMeniu from "./Screens/adaugaMeniu";
import SearchProduct from "./navigation/tabs";
import addToFavorites from "./Screens/addToFavorites";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackComponent() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Home"}
    >
      {/* <Stack.Screen name="StackHome" component={Home} /> */}
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="CheckoutDetails" component={CheckoutDetails} />
      <Stack.Screen name="Stripe" component={Stripe} />
      <Stack.Screen
        name="SearchProduct"
        component={SearchProduct}
        options={{ animationEnabled: true }}
      />
      <Stack.Screen
        name="addToFavorites"
        component={addToFavorites}
        options={{ animationEnabled: true }}
      />
    </Stack.Navigator>
  );
}
export default function TabComponent() {
  return (
    <ImageProvider>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeBackgroundColor: "#0b1214",
            activeTintColor: "white",
            inactiveBackgroundColor: "white",
            inactiveTintColor: "#0b1214",
          }}
        >
          <Tab.Screen name="adaugaMagazine" component={adaugaMagazine} />
          <Tab.Screen name="adaugaCategorie" component={adaugaCategorie} />
          <Tab.Screen name="adaugaMeniu" component={adaugaMeniu} />
          <Tab.Screen name="StackComponent" component={StackComponent} />
        </Tab.Navigator>
      </NavigationContainer>
    </ImageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

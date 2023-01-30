import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Login } from "../screens/Login";
import { Splash } from "../screens/Splash";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

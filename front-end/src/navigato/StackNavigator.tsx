import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Splash } from "../screens/Splash";
import { Login } from "../screens/Login";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
};
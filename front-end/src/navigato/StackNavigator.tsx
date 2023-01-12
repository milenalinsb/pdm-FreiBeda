import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Splash } from "../screens/Splash";
import { Login } from "../screens/Login";
import { Dashboard } from "../screens/Dashboard";
import { Notifications } from "../screens/Notifications";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Notifications" component={Notifications} />
        </Stack.Navigator>
    );
};
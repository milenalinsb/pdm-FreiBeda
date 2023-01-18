import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Splash } from "../screens/Splash";
import { Login } from "../screens/Login";
import { Dashboard } from "../screens/Dashboard";
import { Notifications } from "../screens/Notifications";
import { Governanca } from "../screens/Governanca";
import { PerfilOSC } from "../screens/PerfilOSC";
import { PublicoAlvo } from "../screens/PublicoAlvo";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Governanca" component={Governanca} />
            <Stack.Screen name="PerfilOSC" component={PerfilOSC} />
            <Stack.Screen name="PublicoAlvo" component={PublicoAlvo} />
        </Stack.Navigator>
    );
};
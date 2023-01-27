import React, { Fragment } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigator } from "./src/navigato/StackNavigator";
import { TabNavigator } from "./src/navigato/TabNavigator";

const Stack = createNativeStackNavigator()

export const Routes = () => {
    return (
        <Fragment>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Start" component={StackNavigator} />
                    <Stack.Screen name="Dashboard" component={TabNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </Fragment>
    );
};
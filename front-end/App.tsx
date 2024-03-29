import { Box, NativeBaseProvider } from "native-base";
import { LogBox } from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Routes } from "./Routes";
import { theme } from "./src/theme";
import { RoutesContexts } from "./src/contexts/RoutesContexts";
import { useState } from "react";

export default function App() {
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();

  const [route,setRoute] = useState("Home");

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AlertNotificationRoot>
          <NativeBaseProvider theme={theme}>
            <Box bg={"primary.900"} safeAreaTop />
            <Routes />
          </NativeBaseProvider>
        </AlertNotificationRoot>
      </GestureHandlerRootView>
    </>
  );
}

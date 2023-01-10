import { Box, NativeBaseProvider } from "native-base";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Routes } from "./Routes";
import { theme } from "./src/theme";

export default function App() {
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

import { Box, NativeBaseProvider } from "native-base";
import { Routes } from "./Routes";
import { theme } from "./src/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <>
     <GestureHandlerRootView style={{ flex: 1 }}>
     <NativeBaseProvider theme={theme}>
        <Box bg={"primary.900"} safeAreaTop />
        <Routes />
      </NativeBaseProvider>
     </GestureHandlerRootView>
    </>
  );
}

import { Box, NativeBaseProvider } from "native-base";
import { Text } from "react-native";
import { theme } from "./src/theme";

export default function App() {
  return (
    <>
      <NativeBaseProvider theme={theme}>
        <Box bg={"primary.900"} safeAreaTop />
        <Text>Open up App.tsx to start working on your app!</Text>
      </NativeBaseProvider>
    </>
  );
}

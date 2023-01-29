import { LinearGradient } from "expo-linear-gradient";
import { Box, HStack } from "native-base";
import { useState } from "react";
import { Keyboard, TouchableOpacity } from "react-native";
import { DashboardIcon } from "../DashboardIcon";
import { NotificationIcon } from "../NotificationIcon";
import { PerfilIcon } from "../PerfilIcon";
import { styles } from "./styles";

type Props = {
  navigation: any;
  page: string;
};

export const Footer = ({ navigation, page }: Props) => {
  const [sizeHeader, setSizeHeader] = useState(true);
  const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
    setSizeHeader(false);
  });
  const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
    setSizeHeader(true);
  });

  return (
    <>
        <Box
          shadow={"8"}
          backgroundColor={"#ffffff"}
          style={styles.container}
        >
          <HStack style={styles.cont}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              activeOpacity={0.8}
            >
              <DashboardIcon
                color={page === "Dashboard" ? "#8ADE48" : "#d4d7e0"}
                height={25}
                width={90}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
              activeOpacity={0.8}
            >
              <NotificationIcon
                color={page === "Notifications" ? "#8ADE48" : "#d4d7e0"}
                height={25}
                width={90}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Perfil")}
              activeOpacity={0.8}
            >
              <PerfilIcon
                color={page === "Perfil" ? "#8ADE48" : "#d4d7e0"}
                height={25}
                width={90}
              />
            </TouchableOpacity>
          </HStack>
        </Box>
    </>
  );
};

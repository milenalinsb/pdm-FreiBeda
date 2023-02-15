import { useFocusEffect } from "@react-navigation/native";
import { Box, Button } from "native-base";
import React from "react";
import { AvatarPerfil } from "../components/AvatarPerfil";
import { Footer } from "../components/Footer";
import { PerfilContainer } from "../components/PerfilContainer";
import { logout } from "../services/logout";
import { NavigationProps } from "../types/navigation";

export const Perfil = ({ navigation }: NavigationProps) => {

  return (
    <>
      <PerfilContainer>
        <AvatarPerfil />
      </PerfilContainer>
      <Box bg={"#ffffff"}>
        <Button
          margin={12}
          colorScheme={"error"}
          onPress={() => logout({ navigation })}
        >
          Sair
        </Button>
      </Box>
      <Footer navigation={navigation} page={"Perfil"} />
    </>
  );
};

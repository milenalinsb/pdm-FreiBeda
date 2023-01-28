import { HStack,Text } from "native-base";
import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { NavigationProps } from "../types/navigation";

type Props = {
  navigation: NavigationProps;
  route: any;
};

export const Osc = ({ navigation, route }: Props) => {
  return (
    <>
      <Header
        nome={route.params.nome}
        sigla={route.params.sigla}
        local={`${route.params.endereco.cidade}, ${route.params.endereco.estado}`}
      />
      <ScrollView>
        <HStack space={3} justifyContent="center">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PerfilOsc", route.params);
            }}
            activeOpacity={0.8}
          >
            <Card texto="Perfil da OSC" icon={"group"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PerfilOsc", route.params);
            }}
            activeOpacity={0.8}
          >
            <Card texto="Projetos" icon={"book"} />
          </TouchableOpacity>
        </HStack>
        <HStack space={3} justifyContent="center">
          <Card texto="Governanca" icon={"user"} />
          <Card texto="Beneficiarios" icon={"male"} />
        </HStack>
      </ScrollView>
      <Footer navigation={navigation} page={"Dashboard"} />
    </>
  );
};

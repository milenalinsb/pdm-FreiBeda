import { HStack, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";
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
      <ScrollView bg={"#ffffff"}>
        <HStack space={3} justifyContent="center">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Governancas", route.params);
            }}
            activeOpacity={0.8}
          >
            <Card texto="Governanca" icon={"user"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProjetosOsc", {
                ...route.params,
                paramPropKey: "paramPropValue",
              });
            }}
            activeOpacity={0.8}
          >
            <Card texto="Projetos" icon={"book"} />
          </TouchableOpacity>
        </HStack>
        <HStack space={3} justifyContent="center">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Map", {
                ...route.params,
                paramPropKey: "paramPropValue",
              });
            }}
            activeOpacity={0.8}
          >
            <Card texto="Localização" icon={"map-marker"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BeneficiariosOsc", {
                idOsc: route.params.id,
                ...route.params,
                paramPropKey: "paramPropValue"
              })
            }}>
            <Card texto="Beneficiarios" icon={"male"} />
          </TouchableOpacity>
        </HStack>
      </ScrollView>
      <Footer navigation={navigation} page={"Dashboard"} />
    </>
  );
};

import { Box, Button, Divider, Heading, ScrollView, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Back } from "../components/Back";
import { Footer } from "../components/Footer";
import { NavigationProps } from "../types/navigation";

type Props = {
  navigation: NavigationProps;
  route: any;
};

export const PerfilOsc = ({ navigation, route }: Props) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("Osc", route.params)}
        activeOpacity={0.8}
      >
        <Back text="Voltar" />
      </TouchableOpacity>
      <ScrollView bg={"#ffffff"}>
        <Box borderX="1" borderRadius="md">
          <VStack space="4" divider={<Divider />}>
            <Box px="4" pt="4">
              <Heading>Missão</Heading>
            </Box>
            <Box px="4">{route.params.missao}</Box>
          </VStack>
        </Box>
        <Box borderX="1" borderRadius="md">
          <VStack space="4" divider={<Divider />}>
            <Box px="4" pt="4">
              <Heading>Visão</Heading>
            </Box>
            <Box marginBottom={4} px="4">
              {route.params.visao}
            </Box>
          </VStack>
        </Box>
        <Box padding={1} px="1">
          <Button
            margin={3}
            size={"md"}
            onPress={() => navigation.navigate("Map", route.params)}
          >
            Endereço da Organização
          </Button>
        </Box>
      </ScrollView>
      <Footer navigation={navigation} page={"Dashboard"} />
    </>
  );
};
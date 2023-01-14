import { HStack, ScrollView } from "native-base";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { NavigationProps } from "../types/navigation";

export const Dashboard = ({ navigation }: NavigationProps) => {
  return (
    <>
      <ScrollView>
        <Header
          nome="Cooperativa Terra e Vida - CTV"
          local="Recife, Pernambuco"
        />
        <HStack space={3} justifyContent="center">
          <Card texto="Perfil da OSC" icon={"group"} />
          <Card texto="Perfil da OSC" icon={"group"} />
        </HStack>
        <HStack space={3} justifyContent="center">
          <Card />
          <Card />
        </HStack>
      </ScrollView>
      <Footer navigation={navigation} page={"Dashboard"} />
    </>
  );
};

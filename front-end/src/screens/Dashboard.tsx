import { HStack, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { logout } from "../services/logout";
import { NavigationProps } from "../types/navigation";


//<Header
//nome="Cooperativa Terra e Vida - CTV"
//local="Recife, Pernambuco"
///>

export const Dashboard = ({ navigation }: NavigationProps) => {
  return (
    <>
      <ScrollView>
        <HStack space={3} justifyContent="center">
          <Card texto="Perfil da OSC" icon={"group"} />
          <Card texto="Perfil da OSC" icon={"group"} />
        </HStack>
        <HStack space={3} justifyContent="center">
          <Card />
          <TouchableOpacity
            onPress={() => logout({ navigation })}
            activeOpacity={0.8}
          >
            <Card texto="Sair" icon={"close"} />
          </TouchableOpacity>
        </HStack>
      </ScrollView>
      <Footer navigation={navigation} page={"Dashboard"} />
    </>
  );
};

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard } from "../screens/Dashboard";
import { GovernancaForme } from "../screens/GovernancaForme";
import { GovernancaFormeEdit } from "../screens/GovernancaFormeEdit";
import { Governancas } from "../screens/Governancas";
import { Map } from "../screens/Map";
import { Notifications } from "../screens/Notifications";
import { Osc } from "../screens/Osc";
import { OscForme } from "../screens/OscForme";
import { Perfil } from "../screens/Perfil";
import { PerfilOsc } from "../screens/PerfilOsc";
import { ProjetosOsc } from "../screens/ProjetosOsc";
import { CadastrarProjetos } from "../screens/CadastrarProjetos";
import { ProjetoOsc } from "../screens/ProjetoOSC";
import { ProjetoOscEdit } from "../screens/ProjetoOscEdit";
import { BeneficiariosOsc } from "../screens/BeneficiariosOsc";
import { CadastrarBeneficiario } from "../screens/CadastrarBeneficiario";
import { BeneficiarioEdit } from "../screens/BeneficiarioEdit";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="Osc" component={Osc} />
      <Tab.Screen name="OscForme" component={OscForme} />
      <Tab.Screen name="PerfilOsc" component={PerfilOsc} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Governancas" component={Governancas} />
      <Tab.Screen name="GovernancaForme" component={GovernancaForme} />
      <Tab.Screen name="GovernancaFormeEdit" component={GovernancaFormeEdit} />
      <Tab.Screen name="ProjetosOsc" component={ProjetosOsc} />
      <Tab.Screen name="ProjetoOSC" component={ProjetoOsc} />
      <Tab.Screen name="ProjetoOscEdit" component={ProjetoOscEdit} />
      <Tab.Screen name="CadastrarProjetos" component={CadastrarProjetos} />
      <Tab.Screen name="BeneficiariosOsc" component={BeneficiariosOsc} />
      <Tab.Screen name="CadastrarBeneficiario" component={CadastrarBeneficiario} />
      <Tab.Screen name="BeneficiarioEdit" component={BeneficiarioEdit} />
    </Tab.Navigator>
  );
};

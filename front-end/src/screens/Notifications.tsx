import { ScrollView } from "native-base";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Notification } from "../components/Notification";
import { NavigationProps } from "../types/navigation";

export const Notifications = ({ navigation }: NavigationProps) => {
  return (
    <>
      <ScrollView>
        <Header
          nome={"Cooperativa Terra e Vida - CTV"}
          local={"Recife, Pernambuco"}
        />
        <Notification textoNotificacao={"Teste"} />
        <Notification
          textoNotificacao={"Pendências no departamento financeiro"}
        />
        <Notification textoNotificacao={"Teste"} />
        <Notification textoNotificacao={"Teste"} />
      </ScrollView>
      <Footer navigation={navigation} page={"Notifications"} />
    </>
  );
};

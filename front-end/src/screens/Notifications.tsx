import { ScrollView } from "native-base";
import { Header } from "../components/Header";
import { Notification } from "../components/Notification";

export const Notifications = () => {
  return (
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
  );
};

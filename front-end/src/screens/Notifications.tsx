import { Box, ScrollView } from "native-base";
import { Header } from "../components/Header";
import { Notification } from "../components/Notification";

export const Notifications = () => {
    return(
        <ScrollView>
            <Header nome={"Cooperativa Terra e Vida - CTV"} local={"Recife, Pernambuco"} />
            <Box m={1}>
                <Notification textoNotificacao={"Teste"}/>
                <Notification textoNotificacao={"Pendências no departamento financeiro"}/>
                <Notification textoNotificacao={"Teste"}/>
                <Notification textoNotificacao={"Teste"}/>
            </Box>
        </ScrollView>
    )
};
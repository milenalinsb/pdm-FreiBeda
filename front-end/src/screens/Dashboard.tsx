import { ScrollView, Box } from 'native-base';
import { Header } from "../components/Header";
import { Card } from "../components/Card";

export const Dashboard = () => {
    return (
        <ScrollView>
            <Header nome="Cooperativa Terra e Vida - CTV" local="Recife, Pernambuco" />
            <Box flexDirection={"row"} flexWrap={"wrap"} margin={1}>
                <Card texto="Perfil da OSC" icon={"group"} />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </Box>
        </ScrollView>
    )
}
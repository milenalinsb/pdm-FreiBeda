import { View, Box } from "native-base";
import { InputText } from "../components/InputText";

export const PerfilOSC = () => {
    return (
        <View>
            <Box m={6}>
                <InputText textoLabel={'Nome fantasia:'} />
                <InputText textoLabel={'Data de fundação:'} />
                <InputText textoLabel={'Sigla/se houver:'} />
                <InputText textoLabel={'Data ingresso SoliVida:'} />
                <InputText textoLabel={'Rua:'} />
                <Box flexDirection={'row'}>
                    <InputText textoLabel={'Número:'} />
                    <InputText textoLabel={'Bairro:'} />
                </Box>
                <InputText textoLabel={'CEP:'} />
            </Box>
        </View>
    )
}
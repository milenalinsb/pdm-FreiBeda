import { Box, View } from "native-base"
import { InputText } from "../components/InputText"

export const PublicoAlvo = () => {
    return(
        <View>
            <Box m={6}>
                <InputText textoLabel={'Tipo de público direto atendido:'} />
                <InputText textoLabel={'Tipo de público indireto atendido:'} />
            </Box>
        </View>
    )
}
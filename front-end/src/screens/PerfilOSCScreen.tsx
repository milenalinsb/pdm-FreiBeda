import { Box, View } from "native-base"
import { Header } from "../components/Header"
import { InputText } from "../components/InputText"
import { Button } from "../components/Button"

export const PerfilOSCScreen = () => {
    return (
        <View>
            <Header />
            <Box my={25} mx={6}>
                <InputText textoLabel={'ID da OSC'} />
            </Box>
            <Box my={25} mx={6}>
                <Button text="PERFIL DA OSC" />
                <Button text="PERFIL DA OSC" />
                <Button text="MISSÃO/VISÃO" />
                <Button text="GOVERNANÇA" />
            </Box>
        </View>
    )
}
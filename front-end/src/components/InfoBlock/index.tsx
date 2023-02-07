import { Box, Text, VStack } from "native-base"
import { theme } from "../../theme"

type Props = {
    titulo: String,
    conteudo: any
}

export const InfoBlock = ({ titulo, conteudo }: Props) => {
    return (
        <Box flex={1} my={2} borderBottomColor={"#C5C0DB"} borderBottomWidth={0.5} py={3}>
            <VStack space={[2, 4]}>
                <Text fontSize={24} color={`${theme.colors.primary[900]}`}>
                    {titulo}
                </Text>
                <Text>
                    {conteudo}
                </Text>
            </VStack>
        </Box>
    )
}
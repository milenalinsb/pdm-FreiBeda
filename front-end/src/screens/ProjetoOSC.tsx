import { useEffect, useState } from "react"
import { Back } from "../components/Back"
import { NavigationProps } from "../types/navigation"
import { Center, FlatList, ScrollView } from "native-base"
import { getToken } from "../services/asyncStorage"
import { api } from "../services/api"
import { Text, Box } from "native-base"
import { theme } from "../theme"
import { IProjetos } from "../types/projetos"
import { InfoBlock } from "../components/InfoBlock"
import { IBeneficiario } from "../types/beneficiario"
import { TouchableOpacity } from "react-native-gesture-handler"

type Props = {
    navigation: NavigationProps,
    route: any
}

export const ProjetoOsc = ({ navigation, route }: Props) => {
    const [projeto, setProjeto] = useState<IProjetos[]>([]);
    const [beneficiarios, setBeneficiarios] = useState<IBeneficiario[]>([])
    useEffect(() => {
        (async () => {
            const token = await getToken("@token");
            const data = await api.get(`/projetos/buscarProjetos/${route.params.id}`, {
                headers: {
                    authorization: token,
                },
            });
            const beneficiarios = await api.get("/beneficiarios/buscarBeneficiarios", {
                headers: {
                    authorization: token
                }
            })
            setProjeto(data.data[0])
            setBeneficiarios(beneficiarios.data.beneficiarios[0])
        })()
    });
    return (
        <>
            <TouchableOpacity onPress={() => {
                navigation.navigate("ProjetosOsc", route.params)
            }}>
                <Back text="Projetos" />
            </TouchableOpacity>
            <ScrollView backgroundColor="#fff" flex={1}>
                <Center>
                    <Text fontSize={32} color={`${theme.colors.primary[900]}`}>{projeto?.nome}</Text>
                </Center>
                <Box m={10}>
                    <InfoBlock titulo={"Objetivo"} conteudo={projeto.objetivo} />
                    <InfoBlock titulo={"Atividades"} conteudo={projeto.atividades} />
                    <InfoBlock titulo={"Impacto"} conteudo={projeto.impacto} />
                    <InfoBlock titulo={"Responsável"} conteudo={projeto.responsavel} />
                    <InfoBlock titulo={"Valor"} conteudo={`R$ ${projeto.valor}`} />
                    <InfoBlock titulo={"Patrocinadores"} conteudo={projeto.patrocinadores} />
                </Box>

            </ScrollView>
        </>)
}